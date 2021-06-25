var execProcess = require('./scripts/exec_process.js');
const checkDependencies = require('./checkDependencies.js');
const promptProjectSelection = require('./scripts/promptProjectSelection.js');

require('dotenv').config();

let updateService = (name, wantedState) => {
  return execProcess(
    `gcloud run services update ${name} --ingress=${wantedState} --region=us-west1`
  );
};

let servicesToEdit = async (services) => {
  // Prompt will return the selected services in the response variable
  const response = await promptProjectSelection(
    'Hello Shellvenger! Mark the traps that you want to change >>> name-of-the-trap(desired-state)',
    services
  );

  if (response.services.length) {
    // if the user wants to edit any services. Trigger parallel async operations to update the services
    await Promise.all(
      response.services.map(async (service) => {
        for (const name in service) {
          try {
            ({ stdout: serviceChangedOk, stderr: serviceChangeFailed } =
              await updateService(
                name,
                service[name] === 'all' ? 'internal' : 'all'
              ));
            console.log(`Changes to ${name} applied successfully`);
            console.log(serviceChangedOk);
          } catch (error) {
            console.log(`An error occurred while trying to edit ${name}`);
          }
        }
      })
    );
  }
};

(async () => {
  let obtainerServicesList, failedToObtainServicesList, serviceStatus;
  let dependenciesOk = await checkDependencies(['gcloud', 'python']);

  if (dependenciesOk) {
    try {
      // get cloud run services with the botneyTrap tag
      ({ stdout: obtainerServicesList, stderr: failedToObtainServicesList } =
        await execProcess(`gcloud run services list  --format=json`));

      // If found cloud run services
      if (JSON.parse(obtainerServicesList).length) {
        // grab those services and make an array that contains their names and ingress status
        obtainerServicesList = JSON.parse(obtainerServicesList);
        serviceStatus = obtainerServicesList.map((service) => ({
          title: `${service.metadata.name} (${
            service.metadata.annotations['run.googleapis.com/ingress'] === 'all'
              ? 'close'
              : 'open'
          })`,
          value: {
            [service.metadata.name]:
              service.metadata.annotations['run.googleapis.com/ingress'],
          },
        }));

        // pass that array to prompts
        servicesToEdit(serviceStatus);
      }
    } catch (error) {
      return new Error('error', error);
    }
  }
})();
