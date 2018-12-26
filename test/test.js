const assert = require("assert");

const { wc } = require("../lib.js");

const dummyFiles = {
  "fiveChars.txt": "a b c d e",
  "fiveLines.txt": "1\n2\n3\n4\n5"
};

const readFileSync = function(path, encoding) {
  return dummyFiles[path];
};

const dummyFs = { readFileSync };

describe("wc file1", () => {
  describe("for content with one line", () => {
    it("should display the number of lines, words, and bytes of the file along with the file name at the end", () => {
      let userArgs = ["fiveChars.txt"];
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "\t0\t5\t9\tfiveChars.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for content with multiple lines", () => {
    it("should display the number of lines, words, and bytes of the file along with the file name at the end", () => {
      let userArgs = ["fiveLines.txt"];
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "\t4\t5\t9\tfiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
