const {ERROR, WARNING, url, runTests} = require("./testutils");

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
          msgParams: ["Errors"],
          type: ERROR
        },
        {
          msg: "invalid_headline_name",
          msgParams: ["Returns"],
          type: ERROR
        },
        {
          msg: "invalid_headline_order",
          type: ERROR
        },
        {
          msg: "invalid_headline_order",
          type: ERROR
        }
      ],
      expectedAfterFixing: [
        {
          msg: "invalid_headline_order",
          type: ERROR
        },
        {
          msg: "invalid_headline_order",
          type: ERROR
        }
      ]
    }
  ];

  runTests(assert, done, "apiSyntaxHeadlines", "API syntax headline", url, tests);
};

require("sdk/test").run(exports);