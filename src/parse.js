const readUserInput = function(userArgs) {
  const firstArg = userArgs[0];
  const secondArg = userArgs[1];
  const thirdArg = userArgs[2];
  let paths = userArgs.slice(0);

  if (hasOption(firstArg) && hasOption(secondArg) && hasOption(thirdArg)) {
    paths = userArgs.slice(3);
    let options = [firstArg.substr(1), secondArg.substr(1), thirdArg.substr(1)];
    return { paths, options };
  }

  if (hasOption(firstArg) && hasOption(secondArg)) {
    paths = userArgs.slice(2);
    let options = [firstArg.substr(1), secondArg.substr(1)];
    return { paths, options };
  }
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
  let options = firstArg.substr(1).split("");
  paths = userArgs.slice(1);
  return { paths, options };
};

module.exports = {
  readUserInput
};
