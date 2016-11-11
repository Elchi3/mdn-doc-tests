const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc fontElements"] = function testFontElements(assert, done) {
  const tests = [
    {
      str: '<font>Some text</font>' +
           '<font face="Open Sans, sans-serif">Another text</font>',
      expected: [
        {
          msg: '<font>Some text</font>',
          type: ERROR
        },
        {
          msg: '<font face="Open Sans, sans-serif">Another text</font>',
          type: ERROR
        }
      ]
    }
  ];

  runTests(assert, done, "fontElements", "<font> elements", url, tests);
};

require("sdk/test").run(exports);