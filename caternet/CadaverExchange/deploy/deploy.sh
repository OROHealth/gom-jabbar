#!/usr/bin/env bash

kubectl apply -f ./deploy/deployment.yaml

kubectl apply -f ./deploy/service.yaml

kubectl apply -f ./deploy/ingress.yaml