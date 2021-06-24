FROM node:12

RUN  npm install forever -g

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

ADD ./package.json /home/node/app

RUN npm install

COPY ./ /home/node/app

EXPOSE 1337

COPY ./entrypoint.sh /
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

#CMD node app.js 