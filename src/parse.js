const hasOption = function(arg) {
	return arg.startsWith("-");
};

const readUserInput = function(userArgs) {
	let optionArgs = getOptions(userArgs);
	return handleOptions(userArgs, optionArgs);
};

const handleOptions = function(userArgs, optionArgs) {
	let paths = userArgs.slice(optionArgs.length);
	let options = optionArgs.map(x => x.substr(1));
	if (optionArgs.length == 1) options = options[0].split("");
	return { paths, options };
};

const getOptions = function(userArgs, options = []) {
	if (!hasOption(userArgs[0])) {
		return options;
	}
	options.push(userArgs[0]);
	return getOptions(userArgs.slice(1), options);
};

module.exports = {
	readUserInput
};
