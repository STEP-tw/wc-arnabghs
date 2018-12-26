const assert = require("assert");

const { wc } = require("../src/lib.js");

const dummyFiles = {
  "fiveChars.txt": "a b c d e",
  "fiveLines.txt": "1\n2\n3\n4\n5",
  "adjacentSpaces.txt": "a   b2 c\n"
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
      let expectedOutput = "       0       5       9 fiveChars.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for content with multiple lines", () => {
    it("should display the number of lines, words, and bytes of the file along with the file name at the end", () => {
      let userArgs = ["fiveLines.txt"];
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5       9 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for content with adjacent spaces", () => {
    it("should display the number of lines, words, and bytes of the file along with the file name at the end", () => {
      let userArgs = ["adjacentSpaces.txt"];
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       1       3       9 adjacentSpaces.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe("wc file1 file2", () => {
  it("should return line, word and byte count and a total for multiple files", () => {
    let userArgs = "fiveLines.txt fiveChars.txt".split(" ");
    let actualOutput = wc(userArgs, dummyFs);
    let expectedOutput = "       4       5       9 fiveLines.txt\n";
    expectedOutput += "       0       5       9 fiveChars.txt\n";
    expectedOutput += "       4      10      18 total";
    assert.deepEqual(actualOutput, expectedOutput);
  });
});
