# https://hub.docker.com/r/buildkite/puppeteer/
FROM buildkite/puppeteer as builder
WORKDIR /app
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn install --silent
COPY . /app
WORKDIR /app
RUN yarn install && yarn run build

FROM nginx:alpine
RUN mkdir /home/dev
RUN mkdir /home/dev/logs
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d
EXPOSE 80
