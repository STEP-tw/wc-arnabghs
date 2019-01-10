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


const generateOutput = function (err, detailsOfFiles, decorater) {
  if (detailsOfFiles.length != 1) detailsOfFiles.push(getTotal(detailsOfFiles));
  return detailsOfFiles.map(decorater).join("\n");
};

const wc = function (userArgs, fs, printer) {
  let { paths, options } = readUserInput(userArgs);
  const formatAsPerOption = createPrintableFormat.bind(null, options);
  getFinalOutput(fs, paths, generateOutput, formatAsPerOption, printer);
};

const getFinalOutput = function (fs, paths, callback, decorater, printer) {
  let detailsOfFiles = [];
  let counter = 0;
  for (let path of paths) {
    let fileDetails = {};
    fileDetails.path = path;
    fs.readFile(path, "utf-8", function (err, content) {
      let fileDetail = getDetails(content, fileDetails);
      detailsOfFiles.push(fileDetail);
      counter++;
      if (counter == paths.length) {
        let arrangedDetails = callback(null, detailsOfFiles, decorater);
        printer(arrangedDetails);
      }
    });
  }
};

const getDetails = function (content, fileDetail) {
  let lineCount = getLineCount(content);
  let byteCount = getByteCount(content);
  let wordCount = getWordCount(content);
  fileDetail.lineCount = lineCount;
  fileDetail.wordCount = wordCount;
  fileDetail.byteCount = byteCount;
  return fileDetail;
};

const createPrintableFormat = function (options, fileDetails) {
  let orderedOptions = ["l", "w", "c"];
  if (options.length == 0) options = orderedOptions;
  let justifiedDetails = justifyAllDetails(fileDetails);
  let givenOptionsInOrder = orderedOptions.filter(x => options.includes(x));
  let justifiedCounts = givenOptionsInOrder.map(x => justifiedDetails[x]);
  return justifiedCounts.join("") + justifiedDetails.path;
};

const justifyAllDetails = function (fileDetails) {
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

const getTotal = function (detailsOfFiles) {
  let lineCount = detailsOfFiles.reduce(addLines, 0);
  let wordCount = detailsOfFiles.reduce(addWords, 0);
  let byteCount = detailsOfFiles.reduce(addBytes, 0);
  return { lineCount, wordCount, byteCount, path: "total" };
};

module.exports = {
  wc,
  getDetails,
  createPrintableFormat,
  getTotal,
  generateOutput
};