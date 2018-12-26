const { readUserInput } = require("./parse.js");

const wc = function(userArgs, fs) {
  let { paths } = readUserInput(userArgs);

  const fsBoundGetDeatils = getDetails.bind(null, fs);
  let detailsOfFiles = paths.map(fsBoundGetDeatils);
  if (detailsOfFiles.length != 1) detailsOfFiles.push(getTotal(detailsOfFiles));
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

const getTotal = function(detailsOfFiles) {
  const add = function(type, total, details) {
    return total + details[type];
  };

  const addLines = add.bind(null, "lineCount");
  const addWords = add.bind(null, "wordCount");
  const addBytes = add.bind(null, "byteCount");

  let lineCount = detailsOfFiles.reduce(addLines, 0);
  let wordCount = detailsOfFiles.reduce(addWords, 0);
  let byteCount = detailsOfFiles.reduce(addBytes, 0);
  return { lineCount, wordCount, byteCount, path: "total" };
};

module.exports = {
  wc
};
