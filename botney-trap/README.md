# Botney-trap Universe-rescue Plan.

## Not-allSuper-Heroes-Wear-Caps Edition.

---

Welcome Shellvenger.

In this document you will find instructions that will help you deploy those sweet traps to hopefully bring Basherbot's reign of chaos to an end.

The chosen platforms are Google Cloud Platform and Microsoft Azure as backup.

## The Infinity Sources powers:

Let us explain how the provided arsenal maps to the required Infinity Sources powers. Please see the nested bullets for details on how each requirement was addressed

- **Space:** we can teletransport our trap from one Cloud provider to at least another
  - The `npm run deployGCP` and `npm run deployAZ` will deploy the traps on the desired Cloud Provider.
  * when those commands finish execution you will get the addess that will guide you to the trap. Watch your step!

* **Mind:** we have a playground environment, and a "live" environment and can spawn as many more as we want with a
  simple command
  - The `npm run develop` command will spin up a local development environment in a docker container. It even reloads and updates after the shellvenger saves their changes.
  - I assumed the "live" environment refers to the deployment. Which can be updated with the `npm run deployGCP` and `npm run deployAZ` commands
* **Reality:** we can package and deploy our trap in a repeatable way including rollbacks
  - The `npm run buildGCP` will grab your local trap and have it build in GCP without deploying. Is that simple.
  - A rollback implementation was not provided as part of this mission. See below.
* **Power:** we scale both in your chosen primary cloud provider but also "spill out" live in at least another one
  - Each trap deployment to GCP can auto-scale up to 5 instances based on traffic.
  - Azure deployments (ACI) do not autoscale with the current implementation.
  - Spill out was interpreted as being capable of deploting to a different cloud provider. So is covered with the `npm run deployGCP` and `npm run deployAZ` commands.
* **Time:** we have full traceability both of the packaging, deploy and validation process but also of the accessor of
  our botney-trap and our cloud infrastructure itself
  - The build/deployment/health-check logs (That occur during every deployment) get output to the local workstation of the shellvenger deploying the traps. For Both GCP and AZ deployments.
  - This one is pretty neat! The `npm run viewLogsGCP` lets the shellvenger poke around the logs of each trap. Select the trap you are interested in by using that sweet multiselect with in your command line. :)
* **Soul:** we have full control of how our botney-trap can be accessed, and we can change the DNS name with one command
  (all botney-traps are protected by SSL)
  - The `npm run manageTrapsGCP` command lets you enable/disable the traps you have deployed to GCP, with an unprecendented level of UI/UX comfort.
  - The selected stack for GCP technologies features SSL/HTTPS security out of the box.
  - The DNS names cannot be changed at the moment.
  - Azure deployments do not implement and encryption layer at the moment.

## Technical specs

The following packages are required.

- Nodejs [Download](https://nodejs.org/en/download/ 'NodeJS download page')
- Cloud SDK [Download](https://cloud.google.com/sdk 'Cloud SDK download page')

- Azure CLI [Download](hhttps://docs.microsoft.com/en-us/cli/azure/install-azure-cli 'Azure CLI download page')
- Docker [Download](https://www.docker.com/products/docker-desktop 'Docker homepage').

Actually, Each script will check for its dependencies and output a descriptive error message in case they are not found.

## Authentication

### Google Cloud.

Once the Cloud SDK is installed in your system. Make sure the Cloud Build and Cloud Run APIs are enabled in your project as well as billing. After that please do the following:

1.  go ahead and authenticate using the `gcloud auth login` command.
2.  Grab your project ID and paste it in the `.env`file located in this same folder. Set it as the value for the `GCP_PROJECT_ID` variable.

Please keep in mind that the google account that you logged in with must me allowed to trigger build opertions in Cloud builds and manage Services in Cloud Run

### Microsoft Azure

I assume you already have a subscription and resource group created in Azure portal. After having the Azure CLI installed in your system please:

1. Run the `az login` command to authenticate.
2. Grab the name of the resource group you will deploy your traps to and paste in the `.env` file as the value for the `AZ_RESOURCE_GROUP`variable.

---

#### **more specs and tech stuff**

This solution was coded using `node v14.16.0` in a `Darwin Kernel Version 20.5.0: Sat May 8 05:10:31 PDT 2021; root:xnu-7195.121.3~9/RELEASE_ARM64_T8101`Operative system.
Python is a dependency for Google's `Google Cloud SDK 345.0.0`

gcloud auth login
gcloud config set project PROJECT_ID
set PROJECT_ID
