const fs = require("fs");

const { wc } = require("./src/lib.js");

const userArgs = process.argv.slice(2);

wc(userArgs, fs);
