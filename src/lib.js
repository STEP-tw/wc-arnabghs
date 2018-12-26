const { readUserInput } = require("./parse.js");

const {
  getLineCount,
  getByteCount,
  getWordCount,
  addLines,
  addWords,
  addBytes,
  justifier
} = require("./util.js");

const wc = function(userArgs, fs) {
  let { paths } = readUserInput(userArgs);
  const fsBoundGetDeatils = getDetails.bind(null, fs);
  let detailsOfFiles = paths.map(fsBoundGetDeatils);
  if (detailsOfFiles.length != 1) detailsOfFiles.push(getTotal(detailsOfFiles));
  return detailsOfFiles.map(createPrintableFormat).join("\n");
};

const getDetails = function(fs, path) {
  let content = fs.readFileSync(path, "utf-8");
  let lineCount = getLineCount(content);
  let byteCount = getByteCount(content);
  let wordCount = getWordCount(content);
  return { lineCount, wordCount, byteCount, path };
};

const createPrintableFormat = function(fileDetails) {
  let { lineCount, wordCount, byteCount, path } = fileDetails;
  let countsString = justifier(lineCount) + lineCount;
  countsString += justifier(wordCount) + wordCount;
  countsString += justifier(byteCount) + byteCount;

  return countsString + " " + path;
};

const getTotal = function(detailsOfFiles) {
  let lineCount = detailsOfFiles.reduce(addLines, 0);
  let wordCount = detailsOfFiles.reduce(addWords, 0);
  let byteCount = detailsOfFiles.reduce(addBytes, 0);
  return { lineCount, wordCount, byteCount, path: "total" };
};

module.exports = {
  wc,
  getDetails,
  createPrintableFormat,
  getTotal
};
