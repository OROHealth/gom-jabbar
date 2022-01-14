# Schitts Creek Cafe Backend API

## Note

I spent 10 hours on this project as expected, but wasn't able to complete all tasks. Mainly because of the database structure I used that didn't allow me to do queries on the orders, instead I should have used the Attribute Pattern for orders. I also left a few small tasks to improve the code in the TODOs to be completed if I had more time for the assignment.

## Tech

Schitt's Creek Cafe API uses a number of open source projects to work properly:

- [node.js] - evented I/O for the backend
- [mongodb] -
- [Docker]

## Setup

Setup mongodb DB in a docker container using the following command and replace with your database name.

```sh
docker run -p 27017:27017 —name {yourdatabasename} mongo
```

Setup node.js project using the following command.

```sh
npm init -y
```

## Run

Spin up mongodb database using the following command and replace with your database name.

```sh
sudo docker start {yourdatabasename}
```

Start API from dbUtils.js by using the following command.

```sh
node dbUtils.js
```
