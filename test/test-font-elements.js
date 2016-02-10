const {url, runTests} = require("./testutils");

exports["test doc fontElements"] = function testFontElements(assert, done) {
  const tests = [
    {
      str: '<font>Some text</font>' +
           '<font face="Open Sans, sans-serif">Another text</font>',
      expected: [
        '<font>Some text</font>',
        '<font face="Open Sans, sans-serif">Another text</font>'
      ]
    }
  ];

  runTests(assert, done, "fontElements", "<font>", url, tests);
};

require("sdk/test").run(exports);