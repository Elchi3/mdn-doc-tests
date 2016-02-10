const {url, runTests} = require("./testutils");

exports["test doc summaryHeading"] = function testSummaryHeading(assert, done) {
  const tests = [
    {
      str: '<h2>Summary</h2>' +
           '<h2 id="Summary" name="Summary">Summary</h2>' +
           '<h2 id="Summary" name="foo">Summary</h2>' +
           '<h3 id="Summary">Summary</h3>',
      expected: [
        '<h2>Summary</h2>',
        '<h2 id="Summary" name="Summary">Summary</h2>',
        '<h2 id="Summary" name="foo">Summary</h2>',
        '<h3 id="Summary">Summary</h3>'
      ]
    }
  ];

  runTests(assert, done, "summaryHeading", "summary heading", url, tests);
};

require("sdk/test").run(exports);