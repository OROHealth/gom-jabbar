FROM node:14
WORKDIR /frontdir
COPY package.json .
COPY package-lock.json .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]