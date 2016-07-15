const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc macroSyntaxError"] = function testMacroSyntaxErrors(assert, done) {
  const tests = [
    {
      str: '{{macro}}' +
           '{{ macro }}' +
           '{{macro("param")}}' +
           '{{ macro("param") }}' +
           '{{macro(123)}}' +
           '{{macro(123, "param")}}' +
           '{{macro(\'param\', 123, "param")}}' +
           '{{macro("param)}}' + // Missing closing double quote
           '{{macro(\'param)}}' + // Missing closing single quote
           '{{macro(param)}}' + // Missing quotes
           '{{macro(param")}}' + // Missing opening double quote
           '{{macro(param\')}}' + // Missing opening single quote
           '{{macro(\'param\', 123, "param)}}' + // Missing closing double quote, multiple parameters
           '{{macro("param"))}}' + // Double closing parameter list bracket
           '{{macro("param")}' + // Missing closing macro curly brace after double quoted parameter
           '{{macro(\'param\')}' + // Missing closing macro curly brace after single quoted parameter
           '{{macro("param"}}' + // Missing closing parameter list bracket after double quoted parameter
           '{{macro(\'param\'}}' + // Missing closing parameter list bracket after single quoted parameter
           '{{macro(param"}}' + // Missing opening double quote and missing closing parameter list bracket
           '{{macro(param"))}}' + // Missing opening double quote and double closing parameter list bracket
           '{{macro(123, "param()"}}', // Missing closing parameter list bracket after string parameter containing bracket
      expected: [
        {
          msg: "string_parameter_incorrectly_quoted",
          msgParams: ['{{macro("param)}}'],
          type: ERROR
        },
        {
          msg: "string_parameter_incorrectly_quoted",
          msgParams: ["{{macro('param)}}"],
          type: ERROR
        },
        {
          msg: "string_parameter_incorrectly_quoted",
          msgParams: ["{{macro(param)}}"],
          type: ERROR
        },
        {
          msg: "string_parameter_incorrectly_quoted",
          msgParams: ['{{macro(param")}}'],
          type: ERROR
        },
        {
          msg: "string_parameter_incorrectly_quoted",
          msgParams: ["{{macro(param')}}"],
          type: ERROR
        },
        {
          msg: "string_parameter_incorrectly_quoted",
          msgParams: ["{{macro('param', 123, \"param)}}"],
          type: ERROR
        },
        {
          msg: "additional_closing_bracket",
          msgParams: ['{{macro("param"))}}'],
          type: ERROR
        },
        {
          msg: "missing_closing_curly_brace",
          msgParams: ['{{macro("param")}'],
          type: ERROR
        },
        {
          msg: "missing_closing_curly_brace",
          msgParams: ["{{macro(\'param\')}"],
          type: ERROR
        },
        {
          msg: "missing_closing_bracket",
          msgParams: ['{{macro("param"}}'],
          type: ERROR
        },
        {
          msg: "missing_closing_bracket",
          msgParams: ["{{macro(\'param\'}}"],
          type: ERROR
        },
        {
          msg: "missing_closing_bracket",
          msgParams: ['{{macro(param"}}'],
          type: ERROR
        },
        {
          msg: "string_parameter_incorrectly_quoted",
          msgParams: ['{{macro(param"}}'],
          type: ERROR
        },
        {
          msg: "string_parameter_incorrectly_quoted",
          msgParams: ['{{macro(param"))}}'],
          type: ERROR
        },
        {
          msg: "additional_closing_bracket",
          msgParams: ['{{macro(param"))}}'],
          type: ERROR
        },
        {
          msg: "missing_closing_bracket",
          msgParams: ['{{macro(123, "param()"}}'],
          type: ERROR
        }
      ]
    }
  ];

  runTests(assert, done, "macroSyntaxError", "macro syntax error", url, tests);
};

require("sdk/test").run(exports);