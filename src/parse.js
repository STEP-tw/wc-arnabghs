const readUserInput = function(userArgs) {
  const firstArg = userArgs[0];
  let paths = userArgs.slice(0);
  if (hasOption(firstArg)) {
    let option = firstArg[1];
    paths = userArgs.slice(1);
    return { paths, option };
  }
  return { paths };
};

const hasOption = function(firstArg) {
  return firstArg.startsWith("-");
};

module.exports = {
  readUserInput
};
