const {url, runTests} = require("./testutils");

exports["test doc emptyBrackets"] = function testEmptyBrackets(assert, done) {
  const tests = [
    {
      str: '{{ foo() }}' +
           '{{bar()}}' +
           '{{foobar("abc")}}' +
           '{{baz}}',
      expected: [
        '{{ foo() }}',
        '{{bar()}}'
      ]
    }
  ];

  runTests(assert, done, "emptyBrackets", "empty brackets", url, tests);
};

require("sdk/test").run(exports);