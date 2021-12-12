import pathlib
import subprocess
import sys
import click
import os

from rich import console


def get_venv():
    return subprocess.run([sys.executable, "-m", "pipenv", "--venv"], capture_output=True, check=True)


VENV = pathlib.Path(get_venv().stdout.decode("utf-8").rstrip("\n").strip())

if os.name == 'nt': # If system is windows
    VENV = f"{VENV}\\Scripts\\python.exe"
else:
    VENV = VENV / "bin" / "python"



@click.group()
def main():
    os.environ["FLASK_APP"] = "robot_maker"


@main.command("run", help="Runs the robot maker web application")
def run():
    subprocess.run(["flask", "run"], check=True)


@main.command("simulate-poutine", help="Simulate the manufacturing of poutine")
@click.option('-n', 'n', default=1, help='Set the number of Poutines to product')
def simulate_poutine(n):
    try:
        subprocess.run(["flask", "simulate-poutine-making", "-n", str(n)], check=True)
    except ValueError as e:
        console.log(f"{n} is not a valid int parameter")


@main.command("db", help="Runs database queries")
@click.option('--init', 'init', is_flag=True, help="Will initialise database schema")
@click.option('--load-examples', 'load_examples', is_flag=True, help="Will load sample data into the database")
def database(init, load_examples):
    if init:
        subprocess.run(["flask", "init-db"], check=True)
    
    if load_examples:
        subprocess.run(["flask", "dump-db"], check=True)


@main.command("grpc", help="Starts grpc client and|or server")
@click.option('--run-server', 'run_server', is_flag=True, help="Start grpc server")
@click.option('--run-client', 'run_client', is_flag=True, help="Start grpc client")
def grpc(run_server, run_client):
    if run_server:
        subprocess.run([f"{VENV}", "robot_maker_pb/proto_server.py"])
        
    if run_client:
        subprocess.run([f"{VENV}", "robot_maker_pb/proto_client.py"])


if __name__ == '__main__':
    main()