const checkDependencies = require('./checkDependencies');
const execProcess = require('./scripts/exec_process');
const promptProjectSelection = require('./scripts/promptProjectSelection');
require('dotenv').config();

let logTrap = async (services) => {
  let getServiceLogs = (name) => {
    return execProcess(
      `gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=${name}" --project ${process.env.GCP_PROJECT_ID} --limit 5 --format=table `
    );
  };

  const response = await promptProjectSelection(
    'Please select the project that you want to see the logs for',
    services
  );

  if (response.services.length) {
    await Promise.all(
      response.services.map(async (service) => {
        console.log(service);
        ({ stdout: serviceLogs, stderr: getLogsFailed } = await getServiceLogs(
          service
        ));
        console.log(`Logs for  ${service} below`);
        console.log(serviceLogs);
        if (serviceLogs) {
          console.log('\x1b[32m', `Logs for ${service} below !!!!`);
          console.log(serviceLogs);
        } else {
          console.log(
            '\x1b[31m',
            `Could not get logs for ${service} details below !!!!`
          );
          throw new Error(getLogsFailed);
        }
      })
    );
  }
};

(async () => {
  let obtainedServicesList, failedToObtainServicesList, serviceStatus;
  let dependenciesOk = await checkDependencies(['gcloud', 'python']);

  if (dependenciesOk) {
    try {
      // get cloud run services with the botneyTrap tag
      ({ stdout: obtainedServicesList, stderr: failedToObtainServicesList } =
        await execProcess(`gcloud run services list  --format=json`));

      // If found cloud run services
      if (JSON.parse(obtainedServicesList).length) {
        // grab those services and make an array that contains their names and ingress status
        obtainedServicesList = JSON.parse(obtainedServicesList);
        obtainedServicesList = obtainedServicesList.map((service) => ({
          title: service.metadata.name,
          value: service.metadata.name,
        }));

        // pass that array to prompts
        logTrap(obtainedServicesList);
      }
    } catch (error) {
      return new Error('error', error);
    }
  }
})();
