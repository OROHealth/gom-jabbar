var commandExists = require('command-exists');

// this script is meant to check if an array of dependencies is installed on the host system.
// an array is returned with the result obtained for every dependency
const checkDependencies = async (dependencies) => {
  let dependenciesStatus = await Promise.all(
    dependencies.map((dependency) =>
      commandExists(dependency)
        .then(() => true)
        .catch(() => undefined)
    )
  );

  if (!dependenciesStatus.every((val) => val)) {
    throw new Error(
      `Some of the dependencies ${dependencies} were not found in your system`
    );
    return false;
  } else {
    return true;
  }
};

module.exports = checkDependencies;
