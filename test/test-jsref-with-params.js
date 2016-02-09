const {url, runTests} = require("./testutils");

exports["test doc jsRefWithParams"] = function testJSRefWithParams(assert, done) {
  const tests = [
    {
      str: '{{JSRef()}}' +
           '{{JSRef("Global_Objects")}}' +
           '{{JSRef("Global_Objects", "Math")}}' +
           '{{JSRef}}',
      expected: [
        '{{JSRef()}}',
        '{{JSRef("Global_Objects")}}',
        '{{JSRef("Global_Objects", "Math")}}'
      ]
    }
  ];

  runTests(assert, done, "jsRefWithParams", "{{JSRef}} with params", url, tests);
};

require("sdk/test").run(exports);