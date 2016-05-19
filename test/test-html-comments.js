const {url, runTests} = require("./testutils");

exports["test doc htmlComments"] = function testHTMLComments(assert, done) {
  const tests = [
    {
      str: '<!-- {cke_protected}{C}%3C!%2D%2D%20%2D%2D%3E -->' +
           '<!-- {cke_protected}{C}%3C!%2D%2D%20%3Cspan%3Efoo%3C%2Fspan%3E%20%2D%2D%3E -->' +
           '<!-- {cke_protected}{C}%3C!%2D%2D%20hello%20%5Cn%20world%20%2D%2D%3E -->',
      expected: [
        '<!-- -->',
        '<!-- <span>foo</span> -->',
        '<!-- hello \\n world -->'
      ]
    }
  ];

  runTests(assert, done, "htmlComments", "HTML comment", url, tests);
};

require("sdk/test").run(exports);