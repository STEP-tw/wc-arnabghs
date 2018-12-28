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
  let { paths, options } = readUserInput(userArgs);
  const formatAsPerOption = createPrintableFormat.bind(null, options);
  const fsBoundGetDeatils = getDetails.bind(null, fs);
  let detailsOfFiles = paths.map(fsBoundGetDeatils);
  if (detailsOfFiles.length != 1) detailsOfFiles.push(getTotal(detailsOfFiles));
  return detailsOfFiles.map(formatAsPerOption).join("\n");
};

const getDetails = function(fs, path) {
  let content = fs.readFileSync(path, "utf-8");
  let lineCount = getLineCount(content);
  let byteCount = getByteCount(content);
  let wordCount = getWordCount(content);
  return { lineCount, wordCount, byteCount, path };
};

const createPrintableFormat = function(options, fileDetails) {
  let orderedOptions = ["l", "w", "c"];
  if (options.length == 0) options = orderedOptions;
  let justifiedDetails = justifyAllDetails(fileDetails);
  let givenOptionsInOrder = orderedOptions.filter(x => options.includes(x));
  let justifiedCounts = givenOptionsInOrder.map(x => justifiedDetails[x]);
  return justifiedCounts.join("") + justifiedDetails.path;
};

const justifyAllDetails = function(fileDetails) {
  let { lineCount, wordCount, byteCount, path } = fileDetails;
  let justifiedPath = " " + path;
  let justifiedLineCount = justifier(lineCount) + lineCount;
  let justifiedWordCount = justifier(wordCount) + wordCount;
  let justifiedByteCount = justifier(byteCount) + byteCount;
  return {
    path: justifiedPath,
    l: justifiedLineCount,
    w: justifiedWordCount,
    c: justifiedByteCount
  };
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
