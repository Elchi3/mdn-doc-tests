const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc languagesMacro"] = function testEmptyElements(assert, done) {
  const tests = [
    {
      str: '{{ languages( { "ja": "Ja/Browser_chrome_tests" } ) }}',
      expected: [
        {
          msg: '{{ languages( { "ja": "Ja/Browser_chrome_tests" } ) }}',
          type: ERROR
        }
      ]
    }
  ];

  runTests(assert, done, "languagesMacro", "{{languages}} macro", url, tests);
};

require("sdk/test").run(exports);