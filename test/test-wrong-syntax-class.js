const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc wrongSyntaxClass"] = function testWrongSyntaxClass(assert, done) {
  const tests = [
    {
      str: 'foo<h2>Syntax</h2>\\n<pre class=\"syntaxbox\">syntax</pre>bar',
      expected: []
    },
    {
      str: 'foo<h2>Syntax</h2>\\n<pre class=\"brush:css\">syntax examples</pre>bar<h3>Formal syntax</h3>\\n<pre class=\"syntaxbox\">syntax</pre>',
      expected: []
    },
    {
      str: 'foo<h2>Syntax</h2>\\n<pre class=\"brush:js\">syntax</pre>bar',
      expected: [
        {
          msg: "wrong_syntax_class_used",
          msgParams: ["brush:js"],
          type: ERROR
        }
      ],
      expectedAfterFixing: []
    },
    {
      str: 'foo<h2>Syntax</h2>\\n<pre class=\"brush:css\">syntax examples</pre>bar<h3>Formal syntax</h3>\\n<pre class=\"eval\">syntax</pre>baz<h2>Other section</h2>',
      expected: [
        {
          msg: "wrong_syntax_class_used",
          msgParams: ["eval"],
          type: ERROR
        }
      ],
      expectedAfterFixing: []
    }
  ];

  runTests(assert, done, "wrongSyntaxClass", "Syntax box class", url, tests);
};

require("sdk/test").run(exports);