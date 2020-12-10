# Poutine production center

## Requirements

-   Docker 19.03 or later
-   Node.js 14.15.1
-   npm 6.14.9
-   [Postman](https://www.postman.com/)

## Local development

### Set up project

```bash
npm install
```

### Launch one of the robot makers

You first need to set up your environment variables (see Environment variables). You can change them if you know what you are doing.

```bash
cp .env.sample .env
```

Then you start the configured Robot Maker

```bash
npm run start
```

### Unit test

```bash
npm run test
```

### Environment variables

-   NODE_ENV
    -   description: The node environment (will toggle logs, typing errors ...)
    -   allowed values: development, production
    -   default value: development
-   LOG_LEVEL
    -   description: The log level
    -   allowed values: trace, debug, info, warn, error, fatal
    -   default value: info
-   DEBUG
    -   description: The debug log channels
    -   default value:
-   PORT
    -   description: The port to which server listens to
    -   default value: 8080
-   BACKEND_URL
    -   description: The url of your backend server
    -   default value: http://localhost
-   API_PREFIX
    -   description: The prefix to every url declared by the server
    -   default value: /api
-   ROBOT_NAME
    -   description: The robot you want to launch
    -   allowed values: bizar, montroyashi, nordo, oldoporto, outremona, pierre, verduny, chef
    -   default value: chef
-   FRYING_OILS
    -   description: Only used by the Bizar robot maker. It is a comma separated list containing oils it can use to fry potatoes.
    -   default value: canola,sunflower,colza

## Dockerized Robot Makers

### How to

A pre-configured environment has been set into `./docker-compose.yaml`. It will launch all Robot Makers into Docker behind a NGINX reverse-proxy.

First, you build your docker image. Then, you launch all Robot Makers into docker services:

```bash
docker build . -t robot-maker:dev
docker-compose up
```

If you want to close the cuisine:

```bash
docker-compose down
```

**Note: relaunch these commands everytime you want to rebuild your micro-services**

### Integration test

**Pre-requisite: set up your local development environment**

Following command will launch `newman`. The latter will request dockerized robot makers.

```bash
npm run test:integration
```

### Live documentation

Each Robot Maker comes with its own swagger documentation page (only when deployed with NODE_ENV=development)

You can access it at: [http://localhost/{ROBOT_NAME}/api/docs/]()

Example: [http://localhost/verduny/api/docs/](http://localhost/verduny/api/docs/)

## Overview of the project

_All following explanations will take the assumption you have launched the Robot Makers following Dockerized Robot Makers section_

-   The project contains all robots. Only the one set in the ROBOT_NAME env var is started. In perfect world I would have done one repository by robot.
-   You can use my Postman configuration by importing `./poutine.postman_collection.json` into Postman.
-   I created a new robot named: `chef`. It is meant to cook a poutine by requesting all ingredients to other robots. You will find its documentation here [http://localhost/chef/api/docs/](http://localhost/chef/api/docs/)
-   `docker-compose` allows me to easily deploy all robots and access to it by their name (e.g: [http://localhost/{ROBOT_NAME}/api/]()). The `CuisineService` only need the URL of the NGINX server and API_PRFIX to access to all Robots.
-   The test suite is composed of: Jest unit tests and Newman integration tests. Test coverage is minimal. We could easily add the integration test to a continuous integration server.
-   You can add new frying oil to the bizar robot maker by adding its name in `./docker-compose.yaml` bizar FRYING_OILS environment variable. Then execute `docker-compose down && docker-compose up` into you shell. You can now ask to `chef` to make a poutine with that new oil!

