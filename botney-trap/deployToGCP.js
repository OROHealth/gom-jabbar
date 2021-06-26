var execProcess = require('./scripts/exec_process.js');

const { uniqueNamesGenerator, starWars } = require('unique-names-generator');
const checkDependencies = require('./scripts/checkDependencies.js');
require('dotenv').config();

(async () => {
  let dependenciesOk = await checkDependencies(['gcloud', 'python']);
  if (dependenciesOk) {
    let foundTrapContainerImage, noTrapContainerImage;
    try {
      ({ stdout: foundTrapContainerImage, stderr: noTrapContainerImage } =
        await execProcess(
          `gcloud container images list  --format="json" --repository=gcr.io/${process.env.GCP_PROJECT_ID} --filter="name:botney-trap"`
        ));
      foundTrapContainerImage = JSON.parse(foundTrapContainerImage)[0].name;
    } catch (error) {
      return new Error(
        'A container image named after botney-trap could not be found in your private repo or could not be parsed, more info in the following error stack',
        error
      );
    }

    if (foundTrapContainerImage) {
      let name = uniqueNamesGenerator({
        dictionaries: [starWars],
        separator: '-',
      })
        .toLowerCase()
        .replace(' ', '-');
      const { stdout: deploymentSuceeeded, stderr: deploymentError } =
        await execProcess(
          `gcloud run deploy ${name}-trap --image ${foundTrapContainerImage} --allow-unauthenticated --platform managed --region="us-west1" --tag=botneytrap`
        );
      console.log(deploymentError || deploymentSuceeeded);
    }
  }
})();
