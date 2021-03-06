/* eslint-env mocha */

const assert = require("assert");

const {
  wc,
  getDetails,
  createPrintableFormat,
  getTotal,
  generateOutput
} = require("../src/lib.js");

const dummyFiles = {
  "fiveChars.txt": "a b c d e",
  "fiveLines.txt": "1\n2\n3\n4\n5",
  "adjacentSpaces.txt": "a   b2 c\n"
};

const readFileSync = function (path) {
  return dummyFiles[path];
};

const dummyFs = { readFileSync };

describe.skip("head level test for wc", () => {
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
  describe("wc -l file1", () => {
    it("should provide the number of lines for a single file", () => {
      let userArgs = "-l fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -l file1 file2", () => {
    it("should provide the number of lines of all files and their sum", () => {
      let userArgs = "-l fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4 fiveLines.txt\n";
      expectedOutput += "       0 fiveChars.txt\n";
      expectedOutput += "       4 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -c file1", () => {
    it("should provide the number of bytes for a single file", () => {
      let userArgs = "-c fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       9 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -c file1 file2", () => {
    it("should provide the number of bytes of all files and their sum", () => {
      let userArgs = "-c fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       9 fiveLines.txt\n";
      expectedOutput += "       9 fiveChars.txt\n";
      expectedOutput += "      18 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -w file1", () => {
    it("should provide the number of words for a single file", () => {
      let userArgs = "-w fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       5 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -w file1 file2", () => {
    it("should provide the number of bytes of all files and their sum", () => {
      let userArgs = "-w fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       5 fiveLines.txt\n";
      expectedOutput += "       5 fiveChars.txt\n";
      expectedOutput += "      10 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -lw file1", () => {
    it("should count lines and words when -lw is specified", () => {
      let userArgs = "-lw fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -lw file1 file2", () => {
    it("should count lines and words of eact each file and then their total", () => {
      let userArgs = "-lw fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5 fiveLines.txt\n";
      expectedOutput += "       0       5 fiveChars.txt\n";
      expectedOutput += "       4      10 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -wl file1", () => {
    it("should count lines and words when -lw is specified", () => {
      let userArgs = "-wl fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -lw file1 file2", () => {
    it("should count lines and words of each file and then their total", () => {
      let userArgs = "-wl fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5 fiveLines.txt\n";
      expectedOutput += "       0       5 fiveChars.txt\n";
      expectedOutput += "       4      10 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -cl file1", () => {
    it("should count lines and bytes when -wc is specified", () => {
      let userArgs = "-cl fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       9 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -cl file1 file2", () => {
    it("should count lines and bytes of each file and then their total", () => {
      let userArgs = "-cl fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       9 fiveLines.txt\n";
      expectedOutput += "       0       9 fiveChars.txt\n";
      expectedOutput += "       4      18 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -lc file1", () => {
    it("should count lines and bytes when -lc is specified", () => {
      let userArgs = "-lc fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       9 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -lc file1 file2", () => {
    it("should count lines and bytes of each file and then their total", () => {
      let userArgs = "-lc fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       9 fiveLines.txt\n";
      expectedOutput += "       0       9 fiveChars.txt\n";
      expectedOutput += "       4      18 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -wc file1", () => {
    it("should count words and bytes when -wc is specified", () => {
      let userArgs = "-wc fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       5       9 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -wc file1 file2", () => {
    it("should count words and bytes of each file and then their total", () => {
      let userArgs = "-wc fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       5       9 fiveLines.txt\n";
      expectedOutput += "       5       9 fiveChars.txt\n";
      expectedOutput += "      10      18 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -cw file1", () => {
    it("should count words and bytes when -cw is specified", () => {
      let userArgs = "-cw fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       5       9 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -cw file1 file2", () => {
    it("should count words and bytes of each file and then their total", () => {
      let userArgs = "-cw fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       5       9 fiveLines.txt\n";
      expectedOutput += "       5       9 fiveChars.txt\n";
      expectedOutput += "      10      18 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -lcw file1 file2", () => {
    it("should return line, word and byte count and a total for multiple files", () => {
      let userArgs = "-lcw fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5       9 fiveLines.txt\n";
      expectedOutput += "       0       5       9 fiveChars.txt\n";
      expectedOutput += "       4      10      18 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -lcw file1", () => {
    it("should provide the number of lines for a single file", () => {
      let userArgs = "-lcw fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5       9 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -lwc file1 file2", () => {
    it("should return line, word and byte count and a total for multiple files", () => {
      let userArgs = "-lwc fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5       9 fiveLines.txt\n";
      expectedOutput += "       0       5       9 fiveChars.txt\n";
      expectedOutput += "       4      10      18 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -lwc file1", () => {
    it("should provide the number of lines for a single file", () => {
      let userArgs = "-lwc fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5       9 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -l -w file1", () => {
    it("should count lines and words when -l -w is specified", () => {
      let userArgs = "-l -w fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -l -w file1 file2", () => {
    it("should count lines and words of eact each file and then their total", () => {
      let userArgs = "-l -w fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5 fiveLines.txt\n";
      expectedOutput += "       0       5 fiveChars.txt\n";
      expectedOutput += "       4      10 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -w -l file1", () => {
    it("should count lines and words when -l -w is specified", () => {
      let userArgs = "-w -l fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -w -l file1 file2", () => {
    it("should count lines and words of eact each file and then their total", () => {
      let userArgs = "-w -l fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5 fiveLines.txt\n";
      expectedOutput += "       0       5 fiveChars.txt\n";
      expectedOutput += "       4      10 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -l -c file1", () => {
    it("should count lines and words when -l -w is specified", () => {
      let userArgs = "-l -c fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       9 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -l -c file1 file2", () => {
    it("should count lines and words of eact each file and then their total", () => {
      let userArgs = "-l -c fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       9 fiveLines.txt\n";
      expectedOutput += "       0       9 fiveChars.txt\n";
      expectedOutput += "       4      18 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -c -l file1", () => {
    it("should count lines and words when -l -w is specified", () => {
      let userArgs = "-c -l fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       9 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -c -l file1 file2", () => {
    it("should count lines and words of eact each file and then their total", () => {
      let userArgs = "-c -l fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       9 fiveLines.txt\n";
      expectedOutput += "       0       9 fiveChars.txt\n";
      expectedOutput += "       4      18 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -w -c file1", () => {
    it("should count lines and words when -l -w is specified", () => {
      let userArgs = "-w -c fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       5       9 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -w -c file1 file2", () => {
    it("should count lines and words of eact each file and then their total", () => {
      let userArgs = "-w -c fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       5       9 fiveLines.txt\n";
      expectedOutput += "       5       9 fiveChars.txt\n";
      expectedOutput += "      10      18 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -c -w file1", () => {
    it("should count lines and words when -l -w is specified", () => {
      let userArgs = "-c -w fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       5       9 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -c -w file1 file2", () => {
    it("should count lines and words of eact each file and then their total", () => {
      let userArgs = "-c -w fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       5       9 fiveLines.txt\n";
      expectedOutput += "       5       9 fiveChars.txt\n";
      expectedOutput += "      10      18 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -l -c -w file1", () => {
    it("should provide the number of lines for a single file", () => {
      let userArgs = "-l -c -w fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5       9 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -l -c -w file1 file2", () => {
    it("should return line, word and byte count and a total for multiple files", () => {
      let userArgs = "-l -c -w fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5       9 fiveLines.txt\n";
      expectedOutput += "       0       5       9 fiveChars.txt\n";
      expectedOutput += "       4      10      18 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -l -w -c file1", () => {
    it("should provide the number of lines for a single file", () => {
      let userArgs = "-l -w -c fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5       9 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -l -w -c file1 file2", () => {
    it("should return line, word and byte count and a total for multiple files", () => {
      let userArgs = "-l -w -c fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5       9 fiveLines.txt\n";
      expectedOutput += "       0       5       9 fiveChars.txt\n";
      expectedOutput += "       4      10      18 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -w -l -c file1", () => {
    it("should provide the number of lines for a single file", () => {
      let userArgs = "-w -l -c fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5       9 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -w -l -c file1 file2", () => {
    it("should return line, word and byte count and a total for multiple files", () => {
      let userArgs = "-w -l -c fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5       9 fiveLines.txt\n";
      expectedOutput += "       0       5       9 fiveChars.txt\n";
      expectedOutput += "       4      10      18 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -w -c -l file1", () => {
    it("should provide the number of lines for a single file", () => {
      let userArgs = "-w -c -l fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5       9 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -w -c -l file1 file2", () => {
    it("should return line, word and byte count and a total for multiple files", () => {
      let userArgs = "-w -c -l fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5       9 fiveLines.txt\n";
      expectedOutput += "       0       5       9 fiveChars.txt\n";
      expectedOutput += "       4      10      18 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -c -w -l file1", () => {
    it("should provide the number of lines for a single file", () => {
      let userArgs = "-c -w -l fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5       9 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -c -w -l file1 file2", () => {
    it("should return line, word and byte count and a total for multiple files", () => {
      let userArgs = "-c -w -l fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5       9 fiveLines.txt\n";
      expectedOutput += "       0       5       9 fiveChars.txt\n";
      expectedOutput += "       4      10      18 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -c -l -w file1", () => {
    it("should provide the number of lines for a single file", () => {
      let userArgs = "-c -l -w fiveLines.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5       9 fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("wc -c -l -w file1 file2", () => {
    it("should return line, word and byte count and a total for multiple files", () => {
      let userArgs = "-c -l -w fiveLines.txt fiveChars.txt".split(" ");
      let actualOutput = wc(userArgs, dummyFs);
      let expectedOutput = "       4       5       9 fiveLines.txt\n";
      expectedOutput += "       0       5       9 fiveChars.txt\n";
      expectedOutput += "       4      10      18 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe.skip("getDetails", () => {
  it("should return lineCount, wordCount, byteCount and path", () => {
    let path = "fiveLines.txt";
    let actualOutput = getDetails(dummyFs, path);
    let expectedOutput = {
      lineCount: 4,
      wordCount: 5,
      byteCount: 9,
      path: "fiveLines.txt"
    };
    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("createPrintableFormat", () => {
  let option = [];
  let details = {
    lineCount: 4,
    wordCount: 5,
    byteCount: 9,
    path: "fiveLines.txt"
  };
  it("should represent the data in the printable manner", () => {
    let actualOutput = createPrintableFormat(option, details);
    let expectedOutput = "       4       5       9 fiveLines.txt";
    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("getTotal", () => {
  let filesDetails = [
    {
      lineCount: 4,
      wordCount: 5,
      byteCount: 9,
      path: "textFiles/fiveLines.txt"
    },
    {
      lineCount: 0,
      wordCount: 5,
      byteCount: 9,
      path: "textFiles/fiveChars.txt"
    }
  ];

  it("should return the sum of lines,words and bytes of all files", () => {
    let actualOutput = getTotal(filesDetails);
    let expectedOutput = {
      lineCount: 4,
      wordCount: 10,
      byteCount: 18,
      path: "total"
    };
    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("generateOutput", () => {
  describe("for default option and single file", () => {
    it("should give formatted output", () => {
      let detailsOfFiles = [{
        path: "textFiles/fiveLines.txt",
        lineCount: 4,
        wordCount: 5,
        byteCount: 9
      }];
      let options = ["l", "w", "c"];
      const decorater = createPrintableFormat.bind(null, options);
      let actualOutput = generateOutput(null, detailsOfFiles, decorater);
      let expectedOutput = "       4       5       9 textFiles/fiveLines.txt";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for default option and multiple files", () => {
    it("should give formatted output", () => {
      let detailsOfFiles = [{
        path: "textFiles/fiveLines.txt",
        lineCount: 4,
        wordCount: 5,
        byteCount: 9
      },
      {
        path: "textFiles/fiveChars.txt",
        lineCount: 0,
        wordCount: 5,
        byteCount: 9
      }];
      let options = ["l", "w", "c"];
      const decorater = createPrintableFormat.bind(null, options);
      let actualOutput = generateOutput(null, detailsOfFiles, decorater);
      console.log(actualOutput);
      let expectedOutput = "       4       5       9 textFiles/fiveLines.txt\n";
      expectedOutput += "       0       5       9 textFiles/fiveChars.txt\n";
      expectedOutput += "       4      10      18 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});