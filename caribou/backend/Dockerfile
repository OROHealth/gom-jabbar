FROM node:14
WORKDIR /backdir
COPY package.json .
RUN npm install
EXPOSE 5050
CMD ["npm", "start"]