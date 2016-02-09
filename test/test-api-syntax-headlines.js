const {url, runTests} = require("./testutils");

exports["test doc apiSyntaxHeadlines"] = function testSummaryHeading(assert, done) {
  const tests = [
    {
      str: '<h2 id="Syntax">Syntax</h2>' +
           '<h3>Errors</h3>' +
           '<h3>Returns</h3>' +
           '<h3>Parameters</h3>',
      expected: [
        {
          msg: "invalid_headline_name",
          msgParams: ["Errors"]
        },
        {
          msg: "invalid_headline_name",
          msgParams: ["Returns"]
        },
        {
          msg: "invalid_headline_order",
        },
        {
          msg: "invalid_headline_order",
        }
      ]
    }
  ];

  runTests(assert, done, "apiSyntaxHeadlines", "API syntax headline", url, tests);
};

require("sdk/test").run(exports);