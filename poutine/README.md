Poutine is being manufactured by various robots through an industrial process in the RobotMaker factory.

This application is a *flask* API application the integrated all the various process of a valid poutine industrial process.

You can have personal feel and appreciation of the system by following the instructions listed below.


Requirements
============
* Python >= 10 and pip


Instructions to run for locally
============

  * First cd into the module directory:
      
        cd poutine


### 1. Setup virtual environment

  * Install `pipenv` by running the command:

        pip install pipenv

  * Install project dependencies:

        pipenv sync


### 2. Run application

  #### a. Quickly Run application with bootstrapper

From this point you can quickly start the application with bootstrap script by running the command:

    ./bootstrap

  #### b. Run application manually

* First, Sign in to your project environment shell with the command:
  
        pipenv shell
    
* Then, Initialize database by running the command:

        flask init-db

* Finally, run application with the command:

        flask run


Application will serve at http://127.0.0.1:5000 . You can also visit the interactive swagger-ui at http://127.0.0.1:5000/swagger/swagger-ui


### 3. Simulate Poutine Production Process

  You can also simulate a fake poutine production process from the commandline. To do this, first you have to sign in to your shell with:

        pipenv shell

  Then run the following command to trigger the simulation

      flask simulate-poutine-making

  You can also run `flask simulate-poutine-making --help` for more help



Instructions to execute Integration Tests
============

  * To run tests:
        
        pytest
  
  * To run tests with tests coverage:

        coverage run -m pytest

    * You can view coverage report with: `coverage report`
    * OR - An HTML report can be generated and viewed with: `coverage html`


  
Instructions to generate and execute gRPC processes
============

The API process can be streamlined and automated through a gRPC pipeline. The gRPC services implemented in this project
simulate the execution, and the duration of the execution of batches of 10 poutines.

You can visualize this yourself by doing the following:

  1. First, generate gRPC Code
            
          python -m grpc_tools.protoc -I protos --python_out=robot_maker_pb --grpc_python_out=robot_maker_pb protos/robot_maker.proto

  2. Next, Run gRPC Server
        
          python robot_maker_pb/proto_server.py

  * And Run gRPC Client in another terminal

          python robot_maker_pb/proto_client.py

  You can monitor the logs on each terminal to observe the progress of the poutine production process.