const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc emptyBrackets"] = function testEmptyBrackets(assert, done) {
  const tests = [
    {
      str: '{{ foo() }}' +
           '{{bar()}}' +
           '{{foobar("abc")}}' +
           '{{baz}}',
      expected: [
        {
          msg: '{{ foo() }}',
          type: ERROR
        },
        {
          msg: '{{bar()}}',
          type: ERROR
        }
      ]
    }
  ];

  runTests(assert, done, "emptyBrackets", "empty brackets", url, tests);
};

require("sdk/test").run(exports);