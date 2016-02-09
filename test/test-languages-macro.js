const {url, runTests} = require("./testutils");

exports["test doc languagesMacro"] = function testEmptyElements(assert, done) {
  const tests = [
    {
      str: '{{ languages( { "ja": "Ja/Browser_chrome_tests" } ) }}',
      expected: [
        '{{ languages( { "ja": "Ja/Browser_chrome_tests" } ) }}'
      ]
    }
  ];

  runTests(assert, done, "languagesMacro", "{{languages}} macro", url, tests);
};

require("sdk/test").run(exports);