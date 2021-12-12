FROM node:14
RUN mkdir -p /backend
WORKDIR /backend
COPY . .
RUN npm install
EXPOSE 5050
CMD ["npm", "start"]