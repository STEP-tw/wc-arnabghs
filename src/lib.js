const { readUserInput } = require("./parse.js");

const wc = function(userArgs, fs) {
  let { path } = readUserInput(userArgs);
  let content = fs.readFileSync(path, "utf-8");

  let lineCount = content.split("\n").length - 1;
  let byteCount = content.split("").length;

  let wordCount = content
    .replace(/\n/g, " ")
    .split(" ")
    .filter(x => x !== "").length;

  return ["", lineCount, wordCount, byteCount, path].join("\t");
};

module.exports = {
  wc
};
