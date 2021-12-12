Poutine is being manufactured by various robots through an industrial process in the RobotMaker factory.

This application is a *flask* API application the integrated all the various process of a valid poutine industrial process.

You can have personal feel and appreciation of the system by following the instructions listed below.


 - The poutine making process is pretty straight forward, but the aspect that is most striking with regard to improving
   the business model lies in the choice of ingredients used in the process and also the amount of output expected from 
   the process. The maintenance and optimization of the robots and production process

 - Maintaining the robots too will be very costly as they are a core part of the system and operate a very technical level

 - gRPC was used to streamline the production of poutine instead of GraphQl because it is very well suited for micro-service
   applications and RobotMaker has a very strong potential for being one where each service could one of the robots carrying
   out a specific task, and with gRPC we can optimize the exchange between the services.


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

  * Activate virtual environment

        pipenv shell

  * Install project dependencies:

        pipenv sync


### 2. Run application

You can make use of the `factory` cli tool to easily run and test the application

 * First, Initialize database by running the command:

       python factory db --init --load-examples

 The `--init` flag runs the database schema migration and the `--load-examples` flag applies some demo data in the database.
 You can also run with each flag independently

 * Then, run the application with the command:

       python factory run


Application will serve at `http://127.0.0.1:5000`

You can also visit the interactive swagger-ui at `http://127.0.0.1:5000/swagger/swagger-ui`


### 3. Simulate Poutine Production Process

  You can also simulate a fake poutine production process from the commandline. You can easily spawn this by using the `factory` cli tool with the command:

    python factory simulate-poutine

  Run the command with the `--help` flag for more details.


  
Instructions to generate and execute gRPC processes
============

The API process can be streamlined and automated through a gRPC pipeline. The gRPC services implemented in this project
simulate the execution, and the duration of the execution of batches of 10 poutines.

You can visualize this yourself by doing the following:

  2. Next, Run gRPC Server
        
         python factory grpc --start-server

  3. And Run gRPC Client in another terminal

         python factory grpc --start-server

  You can monitor the logs on each terminal to observe the progress of the poutine production process.

 
  To generate new gRPC code, run the command:

    python -m grpc_tools.protoc -I protos --python_out=robot_maker_pb --grpc_python_out=robot_maker_pb protos/robot_maker.proto

  

Instructions to execute Integration Tests
============

  * To run tests:
        
        pytest
  
  * To run tests with tests coverage:

        coverage run -m pytest

    * You can view coverage report with: `coverage report`
    * OR - An HTML report can be generated and viewed with: `coverage html`
