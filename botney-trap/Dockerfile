FROM node:alpine

#edited based on: Testing scripts via Dockerfile  https://hub.docker.com/_/bash
COPY botney-trap.sh /
COPY runTrap.js /
COPY . /

RUN chmod +x botney-trap.sh
RUN chmod +x runTrap.js

CMD ["node", "runTrap.js"]