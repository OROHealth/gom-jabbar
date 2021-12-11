import os
import sys
import time

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import grpc
from robot_maker.logger import console
from robot_maker_pb import robot_maker_pb2_grpc, robot_maker_pb2
from sqlite3 import ProgrammingError


def run():
    """The run method, that sends gRPC conformant messages to the server"""
    qty = 10
    counter = 0
    pid = os.getpid()
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = robot_maker_pb2_grpc.RobotMakerStub(channel)
        while True:
            try:
                start = time.time()
                response = stub.CookRecipe(robot_maker_pb2.CookRecipeRequest(quantity=qty, count=counter))
                counter = response.count
                if counter % 10 == 0:
                    console.log("%.4f : poutine_count=%s : proc_id=%i" % (time.time() - start, response.count * qty, pid), markup=True)
                time.sleep(0.001)
            except (KeyboardInterrupt, ProgrammingError) as e:
                console.log("Process Terminated" + "" if bool(e) else " : cause {e.__str__()}", markup=True)
                channel.unsubscribe(close)
                exit()


def close(channel):
    """Close the channel"""
    channel.close()


if __name__ == '__main__':
    console.rule("Running Client", )
    run()
