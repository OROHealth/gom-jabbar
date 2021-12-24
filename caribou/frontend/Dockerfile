FROM node:14
RUN mkdir -p /frontend
WORKDIR /frontend
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]