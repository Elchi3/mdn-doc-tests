const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc oldURLs"] = function testOldURLs(assert, done) {
  const tests = [
    {
      str: '<a href=\"/en/Web\">Web</a>' +
           '<a href=\"/En/Mozilla\">Mozilla</a>',
      expected: [
        {
          msg: '<a href=\"/en/Web\">Web</a>',
          type: ERROR
        },
        {
          msg: '<a href=\"/En/Mozilla\">Mozilla</a>',
          type: ERROR
        }
      ]
    }
  ];

  runTests(assert, done, "oldURLs", "'/en/' links", url, tests);
};

require("sdk/test").run(exports);