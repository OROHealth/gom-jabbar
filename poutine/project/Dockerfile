FROM node:14.15.1-alpine

RUN mkdir -p /usr/node/app
WORKDIR /usr/node/app

ENV NODE_ENV=production
ENV PORT=8080

# Copy sources
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./swagger ./swagger
COPY ./src ./src

# Install dependencies
RUN npm install

EXPOSE 8080

USER node

CMD ["npx", "ts-node", "--transpile-only", "-r", "dotenv/config", "-r", "tsconfig-paths/register", "./src/index.ts"]
