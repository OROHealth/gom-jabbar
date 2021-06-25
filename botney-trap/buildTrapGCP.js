const checkDependencies = require('./checkDependencies.js');
var execProcess = require('./scripts/exec_process.js');

require('dotenv').config();

(async () => {
  let dependenciesOk = await checkDependencies(['gcloud', 'python']);

  if (dependenciesOk) {
    const { stdout: buildSuceeded, stderr: buildError } = await execProcess(
      `gcloud builds submit  --tag gcr.io/${process.env.GCP_PROJECT_ID}/botney-trap`
    );

    if (buildError) {
      throw new Error(buildError);
    }
    console.log(buildSuceeded);
    return;
  }
})();
