const {url, runTests} = require("./testutils");

exports["test doc oldURLs"] = function testOldURLs(assert, done) {
  const tests = [
    {
      str: '<a href=\"/en/Web\">Web</a>' +
           '<a href=\"/En/Mozilla\">Mozilla</a>',
      expected: [
        '<a href=\"/en/Web\">Web</a>',
        '<a href=\"/En/Mozilla\">Mozilla</a>'
      ]
    }
  ];

  runTests(assert, done, "oldURLs", "'/en/' link", url, tests);
};

require("sdk/test").run(exports);