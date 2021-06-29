FROM node:14.15.0-alpine

# hadolint ignore=DL3018
RUN apk --no-cache add bash curl less tini vim make python2 git g++ glib
SHELL ["/bin/bash", "-o", "pipefail", "-o", "errexit", "-u", "-c"]

WORKDIR /usr/local/src/app
ENV PATH=$PATH:/usr/local/src/app/node_modules/.bin

# Allow yarn/npm to create ./node_modules
RUN chown node:node .

# Install the latest version of NPM
RUN npm i -g npm@latest

COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node ./src ./src

USER node

# Install dependencies -- dosable post installation scripts
RUN npm ci --only=prod --ignore-scripts
# use tini as PID 1 - avoid zombie process
CMD ["tini", "--", "npm", "start"]
