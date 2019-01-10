const fs = require("fs");

const { wc } = require("./src/lib.js");

const userArgs = process.argv.slice(2);
const printer = console.log;
wc(userArgs, fs, printer);
