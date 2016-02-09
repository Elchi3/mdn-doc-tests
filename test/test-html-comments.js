const {url, runTests} = require("./testutils");

exports["test doc htmlComments"] = function testHTMLComments(assert, done) {
  const tests = [
    {
      str: '<!-- -->' +
           '<!-- <span>foo</span> -->' +
           '<!-- hello \n world -->',
      expected: [
        '<!-- -->',
        '<!-- <span>foo</span> -->',
        '<!-- hello \n world -->'
      ]
    }
  ];

  runTests(assert, done, "htmlComments", "HTML comment", url, tests);
};

require("sdk/test").run(exports);