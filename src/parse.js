const readUserInput = function(userArgs) {
  const firstArg = userArgs[0];
  let paths = userArgs.slice(0);
  if (hasOption(firstArg)) {
    return handleOptions(userArgs);
  }
  return { paths };
};

const hasOption = function(firstArg) {
  return firstArg.startsWith("-");
};

const handleOptions = function(userArgs) {
  const firstArg = userArgs[0];
  let option = firstArg.substr(1);
  paths = userArgs.slice(1);
  return { paths, option };
};

module.exports = {
  readUserInput
};
