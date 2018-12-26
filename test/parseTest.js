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
      let expectedOutput = { paths: ["one.txt"], option: "c" };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for multiple file with single option", () => {
    it("should return path and option", () => {
      let userArgs = "-w one.txt two.txt".split(" ");
      let actualOutput = readUserInput(userArgs);
      let expectedOutput = { paths: ["one.txt", "two.txt"], option: 'w' };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for one file with multiple options", () => {
    it("should return path and options", () => {
      let userArgs = "-lw one.txt".split(" ");
      let actualOutput = readUserInput(userArgs);
      let expectedOutput = { paths: ["one.txt"], option: "lw" };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for multiple file with multiple options", () => {
    it("should return path and options", () => {
      let userArgs = "-cw one.txt two.txt".split(" ");
      let actualOutput = readUserInput(userArgs);
      let expectedOutput = { paths: ["one.txt", "two.txt"], option: 'cw' };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
