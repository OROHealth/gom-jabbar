FROM node:14
WORKDIR /backdir
COPY package.json .
COPY .env .
RUN npm install
EXPOSE 5050
CMD ["npm", "start"]