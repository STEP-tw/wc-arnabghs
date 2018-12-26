const getLineCount = content => content.split("\n").length - 1;
const getByteCount = content => content.split("").length;
const getWordCount = content =>
  content
    .replace(/\n/g, " ")
    .split(" ")
    .filter(x => x !== "").length;

const add = function(type, total, details) {
  return total + details[type];
};

const addLines = add.bind(null, "lineCount");
const addWords = add.bind(null, "wordCount");
const addBytes = add.bind(null, "byteCount");

module.exports = {
  getLineCount,
  getByteCount,
  getWordCount,
  addLines,
  addWords,
  addBytes
};
