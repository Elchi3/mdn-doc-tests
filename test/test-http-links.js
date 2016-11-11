const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc httpLinks"] = function testHTTPLinks(assert, done) {
  const tests = [
    {
      str: '<a href=\"https://somepage.com\">some page</a>' +
           '<a href=\"ftp://somepage.com\">some page</a>' +
           '<a href=\"https://somepage.com?url=http://anotherpage.com\">some page</a>' +
           '<a href=\"http://somepage.com\">some page</a>',
      expected: [
        {
          msg: '<a href="http://somepage.com">some page</a>',
          type: WARNING
        }
      ]
    }
  ];

  runTests(assert, done, "httpLinks", "HTTP links", url, tests);
};

require("sdk/test").run(exports);