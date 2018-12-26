const assert = require("assert");

const { readUserInput } = require("../src/parse.js");

describe("readUserInput", () => {
  describe("for one file with no options", () => {
    it("should return path", () => {
      let userArgs = "one.txt".split(" ");
      let actualOutput = readUserInput(userArgs);
      let expectedOutput = { paths: ["one.txt"] };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for multiple file with no options", () => {
    it("should return path", () => {
      let userArgs = "one.txt two.txt".split(" ");
      let actualOutput = readUserInput(userArgs);
      let expectedOutput = { paths: ["one.txt", "two.txt"] };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
