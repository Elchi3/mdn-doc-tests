const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc jsRefWithParams"] = function testJSRefWithParams(assert, done) {
  const tests = [
    {
      str: '{{JSRef()}}' +
           '{{JSRef("Global_Objects")}}' +
           '{{JSRef("Global_Objects", "Math")}}' +
           '{{JSRef}}',
      expected: [
        {
          msg: '{{JSRef()}}',
          type: ERROR
        },
        {
          msg: '{{JSRef("Global_Objects")}}',
          type: ERROR
        },
        {
          msg: '{{JSRef("Global_Objects", "Math")}}',
          type: ERROR
        }
      ]
    }
  ];

  runTests(assert, done, "jsRefWithParams", "{{JSRef}} with params", url, tests);
};

require("sdk/test").run(exports);