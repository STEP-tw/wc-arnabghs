const hasOption = function(arg) {
  return arg.startsWith("-");
};

const readUserInput = function(userArgs) {
  let optionArgs = userArgs.filter(hasOption);
  return handleOptions(userArgs, optionArgs);
};

const handleOptions = function(userArgs, optionArgs) {
  let paths = userArgs.slice(optionArgs.length);
  let options = optionArgs.map(x => x.substr(1));
  if (optionArgs.length == 1) options = options[0].split("");
  return { paths, options };
};

module.exports = {
  readUserInput
};
