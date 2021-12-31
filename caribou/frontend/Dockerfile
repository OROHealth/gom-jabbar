FROM node:14
RUN mkdir -p /frontdir
WORKDIR /frontdir
COPY  package.json .
COPY .env .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]