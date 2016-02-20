const {url, runTests} = require("./testutils");

exports["test doc invalidMacros"] = function testInvalidMacros(assert, done) {
  const tests = [
    {
      str: '{{apiref}}' +
           '{{bug(123456)}}' +
           '{{previous("some page"}}' +
           '{{cssinfo(\'font-weight\', \'@font\')}}' +
           '{{invalidmacroname}}' +
           '{{invalidmacroname(123456)}}' +
           '{{invalidmacroname("some page")}}' +
           '{{invalidmacroname(\'font-weight\', \'@font\')}}',
      expected: [
        '{{invalidmacroname}}',
        '{{invalidmacroname(123456)}}',
        '{{invalidmacroname("some page")}}',
        '{{invalidmacroname(\'font-weight\', \'@font\')}}'
      ]
    }
  ];

  runTests(assert, done, "invalidMacros", "invalid macros", url, tests);
};

require("sdk/test").run(exports);