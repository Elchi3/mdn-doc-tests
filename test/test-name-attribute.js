const {url, runTests} = require("./testutils");

exports["test doc nameAttribute"] = function testNameAttributes(assert, done) {
  const tests = [
    {
      str: '<span name=""></span>' +
           '<div name="foo"></div>' +
           '<h2 id="foo" name="foo">foo</h2>' +
           '<h2 id="foo_bar" name="foo_bar">foo bar</h2>' +
           '<h3 name=\'baz\'>baz</h3>',
      expected: [
        'name=""',
        'name="foo"',
        'name="foo"',
        'name="foo_bar"',
        'name="baz"'
      ]
    }
  ];

  runTests(assert, done, "nameAttribute", "'name' attribute", url, tests);
};

require("sdk/test").run(exports);