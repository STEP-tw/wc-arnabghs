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
  let { paths, option } = readUserInput(userArgs);
  const formatAsPerOption = createPrintableFormat.bind(null, option);
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

const createPrintableFormat = function(option, fileDetails) {
  if (option === undefined) option = "default";
  let { lineCount, wordCount, byteCount, path } = fileDetails;
  let justifiedPath = " " + path;
  let justifiedLineCount = justifier(lineCount) + lineCount;
  let justifiedWordCount = justifier(wordCount) + wordCount;
  let justifiedByteCount = justifier(byteCount) + byteCount;

  const optionListConstructor = function() {
    (this.l = justifiedLineCount),
      (this.w = justifiedWordCount),
      (this.c = justifiedByteCount),
      (this.lw = this.l + this.w),
      (this.wl = this.l + this.w),
      (this.cl = this.l + this.c),
      (this.lc = this.l + this.c),
      (this.default = this.l + this.w + this.c);
  };

  const logContent = new optionListConstructor();

  return logContent[option] + justifiedPath;
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
