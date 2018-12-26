const wc = function(userArgs, fs) {
  let path = userArgs[0];
  let content = fs.readFileSync(path, "utf-8");

  let lineCount = content.split("\n").length;
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
