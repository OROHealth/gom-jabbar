FROM node:12

RUN apt-get update && apt-get install -qy netcat

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . /app

CMD yarn start

EXPOSE 33333
