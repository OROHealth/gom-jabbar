import os
import sys
import tempfile
import threading
import time

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from concurrent import futures
import grpc
from rich import progress as rich_progress
from robot_maker import create_app
from robot_maker.db import init_db
from robot_maker.logger import console
from robot_maker.models.recipe import Recipe
from robot_maker_pb import robot_maker_pb2_grpc
from robot_maker_pb.robot_maker_pb2 import ListCookRecipeResponse, CookRecipeResponse
from sqlite3 import ProgrammingError


class RobotMakerService(robot_maker_pb2_grpc.RobotMakerServicer):

    def __init__(self):
        self.counter = 0
        self.last_print_time = time.time()

    def __str__(self):
        return self.__class__.__name__

    def CookRecipe(self, request, context):
        qty = request.quantity
        total_poutines = 0
        responses = []

        with rich_progress.Progress() as progress:
            task = progress.add_task("Cooking...", total=qty)
            for i in range(qty):
                progress.console.log(f"[bold]Preparing [bold]#{i + 1}[/] poutine(s) out of [bold]#{qty}[/][/]\n",
                                     markup=True)
                # time.sleep(1)
                poutine_recipe = Recipe.query.filter_by(name="Poutine").first()
                success, message, log = poutine_recipe.cook()
                if success:
                    total_poutines += 1

                responses.append(CookRecipeResponse(status=success, message=message))
                progress.advance(task)

        console.log(f"\n[bold]Successfully produced [bold]#{total_poutines}[/] poutine(s) out of [bold]#{qty}[/]",
                    markup=True)

        self.counter += 1
        if self.counter > 100:
            console.log("10000 calls in %3f seconds" % (time.time() - self.last_print_time), markup=True)
            self.last_print_time = time.time()
            self.counter = 0

        return ListCookRecipeResponse(responses=responses, count=request.count + 1)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    robot_maker_pb2_grpc.add_RobotMakerServicer_to_server(
        RobotMakerService(), server
    )
    server.add_insecure_port("[::]:50051")
    server.start()

    try:
        while True:
            with console.status("Server Running : thread count %i" % (threading.active_count()), spinner="line"):
                time.sleep(10)
    except (KeyboardInterrupt, ProgrammingError) as e:
        console.log("Process Terminated" + "" if bool(e) else " : cause {e.__str__()}", markup=True)
        server.stop(0)


if __name__ == "__main__":
    db_fd, db_path = tempfile.mkstemp()

    app = create_app({
        'TESTING': True,
        'DATABASE': db_path,
    })

    with app.app_context():
        init_db('schema.sql')
        init_db('dump.sql')

    os.close(db_fd)
    os.unlink(db_path)

    with app.app_context():
        console.rule("Running Server", )
        serve()
