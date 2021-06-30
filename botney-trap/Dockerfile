FROM node:14.15.0-alpine

# hadolint ignore=DL3018
RUN apk update && apk --no-cache add bash curl less tini vim make python3 git g++ glib py3-pip \
    && pip3 install --upgrade pip \
    && pip3 install awscli \
    && rm -rf /var/cache/apk/*

SHELL ["/bin/bash", "-o", "pipefail", "-o", "errexit", "-u", "-c"]

WORKDIR /usr/local/src/app
ENV PATH=$PATH:/usr/local/src/app/node_modules/.bin

# Allow yarn/npm to create ./node_modules
RUN chown node:node .

# Install the latest version of NPM
RUN npm i -g npm@latest

# install terraform, kuztomize and kubectl
COPY --chown=node:node ./bin ./bin
RUN ["chmod", "-R", "+x", "./bin"]
RUN ./bin/install_kubectl \
    && ./bin/install_kustomize \
    && ./bin/install_terraform \
    && ./bin/install_doctl \
    && ./bin/install_aws_authenticator

# copy all files
COPY --chown=node:node . .

USER node

# Install dependencies -- dosable post installation scripts
RUN npm ci --only=prod --ignore-scripts
# use tini as PID 1 - avoid zombie process
ENTRYPOINT ["tini"]