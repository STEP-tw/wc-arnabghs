const { readUserInput } = require("./parse.js");

const wc = function(userArgs, fs) {
  let { paths } = readUserInput(userArgs);

  const fsBoundGetDeatils = getDetails.bind(null, fs);
  let detailsOfFiles = paths.map(fsBoundGetDeatils);
  return detailsOfFiles.map(createPrintableFormat).join("\n");
};

const getDetails = function(fs, path) {
  let content = fs.readFileSync(path, "utf-8");
  let lineCount = content.split("\n").length - 1;
  let byteCount = content.split("").length;
  let wordCount = content
    .replace(/\n/g, " ")
    .split(" ")
    .filter(x => x !== "").length;

  return { lineCount, wordCount, byteCount, path };
};

const createPrintableFormat = function(fileDetails) {
  let { lineCount, wordCount, byteCount, path } = fileDetails;
  return ["", lineCount, wordCount, byteCount, path].join("\t");
};

module.exports = {
  wc
};
