var execProcess = require('./scripts/exec_process.js');

const { uniqueNamesGenerator, animals } = require('unique-names-generator');
const checkDependencies = require('./checkDependencies.js');

require('dotenv').config();

(async () => {
  const acrName = 'botneytrapacr2';

  try {
    const { stdout: acrCreatedOk, stderr: acrCreationFailed } =
      await execProcess(
        `az acr create -g ${process.env.AZ_RESOURCE_GROUP} -n ${acrName} --sku Basic --admin-enabled`
      );

    if (acrCreatedOk) {
      const { stdout: containerBuiltOk, stderr: containerBuildFailed } =
        await execProcess(
          `az acr build -r ${acrName} -f ./dockerfile -t botneytrap .`
        );

      let { stdout: acrPassword, stderr: acrPasswordFailed } =
        await execProcess(
          `az acr credential show -n ${acrName} --query "passwords[0].value"  -o json`
        );
      acrPassword = String(acrPassword).replace(' ', '');
      if (!acrPasswordFailed && acrPassword) {
        await new Promise((resolve) => {
          setTimeout(resolve, 5000);
          deployToAcr(acrPassword, acrName);
        });
      }
    }
  } catch (error) {
    throw new Error(error);
  }
})();

const deployToAcr = async (acrPassword, acrName) => {
  let name = uniqueNamesGenerator({
    dictionaries: [animals],
    separator: '-',
  })
    .toLowerCase()
    .replace(' ', '-');

  let cmd =
    `az container create -n ${name}-trap -g ${process.env.AZ_RESOURCE_GROUP} --image "${acrName}.azurecr.io/botneytrap" --registry-username "${acrName}" --registry-password ${acrPassword}  -e TestSetting=ACI --dns-name-label ${name}-trap  --ports 8080 --query "ipAddress.ip"`.replace(
      /(\r\n|\n|\r)/gm,
      ''
    );

  try {
    let { stdout: containerDeployed, stderr: containerDeploymentFail } =
      await execProcess(cmd);
    containerDeployed = containerDeployed
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace('"', '');
    console.log(
      `Dear Basherbot please browse to this insecure URL to ${containerDeployed}:8080`
    );
  } catch (error) {
    console.log(
      'An error occurred while trying to deploy the container from ACR, more info below'
    );
    throw new Error(error);
  }
};
