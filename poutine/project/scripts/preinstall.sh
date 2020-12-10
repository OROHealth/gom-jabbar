#!/usr/bin/env bash

moduleName="$(cat package.json | grep -oP '"name": "\K[\w-]+')"
requiredNpmVersion=$(cat package.json | grep -oP '"npm": "\K[\d\.]+')
requiredNodeVersion=$(cat package.json | grep -oP '"node": "\K[\d\.]+')
npmVersion=$(npm --version)
nodeVersion=$(node --version | grep -oP 'v\K[\d\.]+')

[ "$NODE_ENV" == "development" ] || [ -z "$NODE_ENV" ]
isDev=$?

if [ $isDev == 0 ] && [ "$requiredNodeVersion" != "$nodeVersion" ]; then
    echo "⚠ $moduleName expected you to have node@$requiredNodeVersion and your current version is ${nodeVersion}"
    exit 1
fi

if [ $isDev == 0 ] && [ "$requiredNpmVersion" != "$npmVersion" ]; then
    echo "⚠ $moduleName expected you to have npm@$requiredNpmVersion and your current version is ${npmVersion}"
    echo "🚚 run the following command in order to install the required version: npm i -g npm@$requiredNpmVersion"
    exit 1
fi

if [ $isDev == 0 ] && [ "$requiredNodeVersion" == "$nodeVersion" ] && [ "$requiredNpmVersion" == "$npmVersion" ]; then
    echo "✔ node & npm versions are ok"
fi
