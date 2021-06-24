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


## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

#VOLUME /home/node/app 

#CMD forever start app.js --prod

CMD /wait && /entrypoint.sh

#ENTRYPOINT ["/entrypoint.sh"]

#CMD node app.js 