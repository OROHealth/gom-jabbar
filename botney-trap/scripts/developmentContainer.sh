#!/bin/bash
# This shell script will build a docker image tagged and labeled botney-trap and spin up a container based on that image if one does not exist already
# If one does exist, it will be removed a new one will be created
# The purpose of this is generating a new development environment every time this script gets executed
# which you will want when changes are made to the contents of the container ;)

containers=$(docker container ls -aq -f label=botney-trap)
echo "$containers"

if [ -z "$containers" ]
then
  docker build --tag botney-trap --label botney-trap .
  docker run -p 8080:8080 botney-trap
else
  docker container stop $containers
  docker container rm $containers
  docker build --tag botney-trap --label botney-trap .
  docker run -p 8080:8080 botney-trap
fi

