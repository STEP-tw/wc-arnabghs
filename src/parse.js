const readUserInput = function(userArgs) {
  const firstArg = userArgs[0];
  let paths = userArgs.slice(0);
  if (hasOption(firstArg)) {
    if(firstArg.length === 3) return handleDoubleOption(userArgs);
    return handleSingleOption(userArgs);
  }
  return { paths };
};

const hasOption = function(firstArg) {
  return firstArg.startsWith("-");
};

const handleSingleOption = function(userArgs) {
  const firstArg = userArgs[0];
  let option = firstArg[1];
  paths = userArgs.slice(1);
  return { paths, option };
};

const handleDoubleOption = function(userArgs) {
  const firstArg = userArgs[0];
  let option = firstArg.substr(1);
  paths = userArgs.slice(1);
  return { paths, option };  
}

module.exports = {
  readUserInput
};
