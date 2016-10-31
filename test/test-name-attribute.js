const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc nameAttribute"] = function testNameAttributes(assert, done) {
  const tests = [
    {
      str: '<span name=""></span>' +
           '<div name="foo"></div>' +
           '<h2 id="foo" name="foo">foo</h2>' +
           '<h2 id="foo_bar" name="foo_bar">foo bar</h2>' +
           '<h3 name=\'baz\'>baz</h3>',
      expected: [
        {
          msg: 'name=""',
          type: ERROR
        },
        {
          msg: 'name="foo"',
          type: ERROR
        },
        {
          msg: 'name="foo"',
          type: ERROR
        },
        {
          msg: 'name="foo_bar"',
          type: ERROR
        },
        {
          msg: 'name="baz"',
          type: ERROR
        }
      ],
      expectedAfterFixing: []
    }
  ];

  runTests(assert, done, "nameAttribute", "'name' attribute", url, tests);
};

require("sdk/test").run(exports);