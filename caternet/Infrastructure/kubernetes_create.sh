#!/bin/bash

#this script is tested on debian/Ubuntu operating system

export  PROJECT_ID=PROJECT_ID


#Google cloud sdk installation

echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

sudo apt-get install apt-transport-https ca-certificates gnupg

echo "deb https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -

sudo apt-get update && sudo apt-get install google-cloud-sdk


#kubectl installation   

sudo apt-get install kubectl

# init of the SDK

gcloud init

#create of the cluster

gcloud container clusters create-auto CLUSTER_MIAOU \
    --region northamerica-northeast1-a \
    --project=${PROJECT_ID}
