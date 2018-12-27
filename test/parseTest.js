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
  describe("for one file with single option", () => {
    it("should return path and option", () => {
      let userArgs = "-c one.txt".split(" ");
      let actualOutput = readUserInput(userArgs);
      let expectedOutput = { paths: ["one.txt"], options: ["c"] };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for multiple file with single option", () => {
    it("should return path and option", () => {
      let userArgs = "-w one.txt two.txt".split(" ");
      let actualOutput = readUserInput(userArgs);
      let expectedOutput = { paths: ["one.txt", "two.txt"], options: ["w"] };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for one file with multiple options", () => {
    it("should return path and options", () => {
      let userArgs = "-lw one.txt".split(" ");
      let actualOutput = readUserInput(userArgs);
      let expectedOutput = { paths: ["one.txt"], options: ["l", "w"] };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for multiple file with multiple options", () => {
    it("should return path and options", () => {
      let userArgs = "-cw one.txt two.txt".split(" ");
      let actualOutput = readUserInput(userArgs);
      let expectedOutput = {
        paths: ["one.txt", "two.txt"],
        options: ["c", "w"]
      };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for one file with two options given seperately", () => {
    it("should return path and options", () => {
      let userArgs = "-l -w one.txt".split(" ");
      let actualOutput = readUserInput(userArgs);
      let expectedOutput = { paths: ["one.txt"], options: ["l", "w"] };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for one file with three options given seperately", () => {
    it("should return path and options", () => {
      let userArgs = "-l -w -c one.txt".split(" ");
      let actualOutput = readUserInput(userArgs);
      let expectedOutput = { paths: ["one.txt"], options: ["l", "w", "c"] };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
