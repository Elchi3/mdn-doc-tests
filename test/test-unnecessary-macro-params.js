const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc unnecessaryMacroParams"] = function testUnnecessaryMacroParams(assert, done) {
  const tests = [
    {
      str: '{{JSRef}}' +
           '{{JSRef()}}' +
           '{{JSRef("Global_Objects")}}' +
           '{{ JSRef("Global_Objects", "Math") }}' +
           '{{csssyntax("font-family")}}',
      expected: [
        {
          msg: "macro_with_unused_params",
          msgParams: ['{{JSRef("Global_Objects")}}'],
          type: ERROR
        },
        {
          msg: "macro_with_unused_params",
          msgParams: ['{{ JSRef("Global_Objects", "Math") }}'],
          type: ERROR
        }
      ]
    }
  ];

  runTests(assert, done, "unnecessaryMacroParams", "unnecessary macro params", url, tests);
};

require("sdk/test").run(exports);