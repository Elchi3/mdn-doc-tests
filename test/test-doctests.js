var data = require("sdk/self").data;
var tabs = require("sdk/tabs");

const url = "about:blank";

function runTests(assert, done, name, desc, url, tests) {
  tabs.open({
    url: url,
    onReady: tab => {
      var worker = tabs.activeTab.attach({
        contentScriptFile: ["./doctests.js", "../test/runtests.js"],
        contentScriptOptions: {"name": name, "tests": JSON.stringify(tests)}
      });

      var resultCount = 0;

      worker.port.on("testResult", function(testObj) {
        var matches = testObj.errors;
        var expected = testObj.expected;

        assert.equal(matches.length, expected.length,
                     "Number of " + desc + " matches must be " + expected.length);

        matches.forEach((match, i) => {
          var expectedIsObject = typeof expected[i] === "object";
          var expectedValue = expectedIsObject ? expected[i].msg : expected[i];

          assert.equal(match.msg, expectedValue,
                       "Error message for " + desc + " match must be correct");

          if (expectedIsObject) {
            assert.deepEqual(match.msgParams, expected[i].msgParams,
                             "Error message params for " + desc + " match must be correct");
          }
        });

        resultCount++;
        if (resultCount === tests.length) {
          tabs.activeTab.close();
          done();
        }
      });
    }
  });
}

exports["test doc oldURLs"] = function testOldURLs(assert, done) {
  const tests = [
    {
      str: '<a href=\"/en/Web\">Web</a>' +
           '<a href=\"/En/Mozilla\">Mozilla</a>',
      expected: [
        '<a href=\"/en/Web\">Web</a>',
        '<a href=\"/En/Mozilla\">Mozilla</a>'
      ]
    }
  ];

  runTests(assert, done, "oldURLs", "'/en/' link", url, tests);
};

exports["test doc emptyElements"] = function testEmptyElements(assert, done) {
  const tests = [
    {
      str: '<p> </p>' +
           '<p> \n\r </p>' +
           '<p> &nbsp;</p>' +
           '<p><br><br/></p>' +
           '<img src="http://example.com/image.png">' +
           '<input value="test"/>' +
           '<p><span>some text</span></p>' +
           '<p>some text</p>',
      expected: [
        '<p> </p>',
        '<p> \n\n </p>',
        '<p> &nbsp;</p>',
        '<p><br><br></p>'
      ]
    }
  ];

  runTests(assert, done, "emptyElements", "empty elements", url, tests);
};

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

exports["test doc styleAttribute"] = function testStyleAttributes(assert, done) {
  const tests = [
    {
      str: '<span style=""></span>' +
           '<div style="margin-top:5%"></div>' +
           '<section style="background:#fff; color: rgb(234, 234, 234);"></section>' +
           '<b style=\'padding: 5px !important\'>test</b>' +
           '<span style="font-family: \'Open Sans\', serif; line-height: 1.5"></span>',
      expected: [
        'style=""',
        'style="margin-top:5%"',
        'style="background:#fff; color: rgb(234, 234, 234);"',
        'style="padding: 5px !important"',
        'style="font-family: \'Open Sans\', serif; line-height: 1.5"'
      ]
    }
  ];

  runTests(assert, done, "styleAttribute", "'style' attribute", url, tests);
};

exports["test doc nameAttribute"] = function testNameAttributes(assert, done) {
  const tests = [
    {
      str: '<span name=""></span>' +
           '<div name="foo"></div>' +
           '<h2 id="foo" name="foo">foo</h2>' +
           '<h2 id="foo_bar" name="foo_bar">foo bar</h2>' +
           '<h3 name=\'baz\'>baz</h3>',
      expected: [
        'name=""',
        'name="foo"',
        'name="foo"',
        'name="foo_bar"',
        'name="baz"'
      ]
    }
  ];

  runTests(assert, done, "nameAttribute", "'name' attribute", url, tests);
};

exports["test doc spanCount"] = function testSpanElements(assert, done) {
  const tests = [
    {
      str: '<span>what?</span>' +
           '<p>nope</p>' +
           '<span class="foo" style="font:10px">bar</span>' +
           '<span><dt>foobar</dt></span>' +
           '<span class="seoSummary">seoseoseo</span>',
      expected: [
        '<span>what?</span>',
        '<span class="foo" style="font:10px">bar</span>',
        '<span><dt>foobar</dt></span>'
      ]
    }
  ];

  runTests(assert, done, "spanCount", "<span>", url, tests);
};

exports["test doc preWithoutClass"] = function testPresWithoutClass(assert, done) {
  const tests = [
    {
      str: '<pre class="brush: js"></pre>' +
           '<pre>foobar;</pre>' +
           '<pre class="syntaxbox"></pre>' +
           '<pre id="foo"></pre>' +
           '<pre class="">foo</pre>' +
           '<pre> \n\r foo</pre>',
      expected: [
        '<pre>foobar;</pre>',
        '<pre id="foo"></pre>',
        '<pre class="">foo</pre>',
        '<pre> \n\n foo</pre>'
      ]
    }
  ];

  runTests(assert, done, "preWithoutClass", "<pre> w/o class", url, tests);
};

exports["test doc summaryHeading"] = function testSummaryHeading(assert, done) {
  const tests = [
    {
      str: '<h2>Summary</h2>' +
           '<h2 id="Summary" name="Summary">Summary</h2>' +
           '<h2 id="Summary" name="foo">Summary</h2>' +
           '<h3 id="Summary">Summary</h3>',
      expected: [
        '<h2>Summary</h2>',
        '<h2 id="Summary" name="Summary">Summary</h2>',
        '<h2 id="Summary" name="foo">Summary</h2>',
        '<h3 id="Summary">Summary</h3>'
      ]
    }
  ];

  runTests(assert, done, "summaryHeading", "summary heading", url, tests);
};

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

exports["test doc exampleColonHeading"] = function testExampleColonHeading(assert, done) {
  const tests = [
    {
      str: '<h2>Example</h2>' +
           '<h3 id="Example">Example</h3>' +
           '<h3 id="Example:_Foo">Example: Foo</h3>' +
           '<h3 id="Example:_Using_Math.sin">Example: Using <code>Math.sin</code></h3>' +
           '<h2 id="Example:_Foo">Example: Foo</h2>',
      expected: [
        '<h3 id="Example:_Foo">Example: Foo</h3>',
        '<h3 id="Example:_Using_Math.sin">Example: Using <code>Math.sin</code></h3>',
        '<h2 id="Example:_Foo">Example: Foo</h2>'
      ]
    }
  ];

  runTests(assert, done, "exampleColonHeading", "'Example: ' heading", url, tests);
};

exports["test doc alertPrintInCode"] = function testAlertPrintInCode(assert, done) {
  const tests = [
    {
      str: '<pre>alert("foo")</pre>' +
           '<pre class="syntaxbox">print("bar")</pre>' +
           '<pre>var someOthercode = baz; ' +
           'alert("hello world"); \n var moreCode;</pre>' +
           '<pre>document.write("foobar");</pre>',
      expected: [
        'alert("foo")',
        'print("bar")',
        'alert("hello world")',
        'document.write("foobar")'
      ]
    }
  ];

  runTests(assert, done, "alertPrintInCode", "alert()/print()/eval()/document.write()", url, tests);
};

exports["test doc htmlComments"] = function testHTMLComments(assert, done) {
  const tests = [
    {
      str: '<!-- -->' +
           '<!-- <span>foo</span> -->' +
           '<!-- hello \n world -->',
      expected: [
        '<!-- -->',
        '<!-- <span>foo</span> -->',
        '<!-- hello \n world -->'
      ]
    }
  ];

  runTests(assert, done, "htmlComments", "HTML comment", url, tests);
};

exports["test doc fontElements"] = function testFontElements(assert, done) {
  const tests = [
    {
      str: '<font>Some text</font>' +
           '<font face="Open Sans, sans-serif">Another text</font>',
      expected: [
        '<font>Some text</font>',
        '<font face="Open Sans, sans-serif">Another text</font>'
      ]
    }
  ];

  runTests(assert, done, "fontElements", "<font>", url, tests);
};

exports["test doc httpLinks"] = function testHTTPLinks(assert, done) {
  const tests = [
    {
      str: '<a href=\"https://somepage.com\">some page</a>' +
           '<a href=\"ftp://somepage.com\">some page</a>' +
           '<a href=\"https://somepage.com?url=http://anotherpage.com\">some page</a>' +
           '<a href=\"http://somepage.com\">some page</a>',
      expected: [
        '<a href="http://somepage.com">some page</a>'
      ]
    }
  ];

  runTests(assert, done, "httpLinks", "HTTP link", url, tests);
};

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
           '{{macro(param"))}}', // Missing opening double quote and double closing parameter list bracket
      expected: [
        {
          msg: "string_parameter_incorrectly_quoted",
          msgParams: ['{{macro("param)}}']
        },
        {
          msg: "string_parameter_incorrectly_quoted",
          msgParams: ["{{macro('param)}}"]
        },
        {
          msg: "string_parameter_incorrectly_quoted",
          msgParams: ["{{macro(param)}}"]
        },
        {
          msg: "string_parameter_incorrectly_quoted",
          msgParams: ['{{macro(param")}}']
        },
        {
          msg: "string_parameter_incorrectly_quoted",
          msgParams: ["{{macro(param')}}"]
        },
        {
          msg: "string_parameter_incorrectly_quoted",
          msgParams: ["{{macro('param', 123, \"param)}}"]
        },
        {
          msg: "additional_closing_bracket",
          msgParams: ['{{macro("param"))}}']
        },
        {
          msg: "missing_closing_curly_brace",
          msgParams: ['{{macro("param")}']
        },
        {
          msg: "missing_closing_curly_brace",
          msgParams: ["{{macro(\'param\')}"]
        },
        {
          msg: "missing_closing_bracket",
          msgParams: ['{{macro("param"}}']
        },
        {
          msg: "missing_closing_bracket",
          msgParams: ["{{macro(\'param\'}}"]
        },
        {
          msg: "missing_closing_bracket",
          msgParams: ['{{macro(param"}}']
        },
        {
          msg: "string_parameter_incorrectly_quoted",
          msgParams: ['{{macro(param"}}']
        },
        {
          msg: "string_parameter_incorrectly_quoted",
          msgParams: ['{{macro(param"))}}']
        },
        {
          msg: "additional_closing_bracket",
          msgParams: ['{{macro(param"))}}']
        }
      ]
    }
  ];

  runTests(assert, done, "macroSyntaxError", "macro syntax error", url, tests);
};

exports["test doc wrongHighlightedLine"] = function testWrongHighlightedLines(assert, done) {
  const tests = [
    {
      str: '<pre class="brush: js; highlight[2];">foo\nbar</pre>' +
           '<pre class="brush:js;">foo\nbar</pre>' +
           '<pre class="highlight[1]; brush:js;">foo\nbar</pre>' +
           '<pre class="brush: js; highlight[1,3];"foo\nbar\nbaz</pre>' +
           '<pre class="brush: js; highlight[1-3];"foo\nbar\nbaz</pre>' +
           '<pre class="brush: js; highlight[1-3,5];"foo\nbar\nbaz\nbax\nbix</pre>' + +
           '<pre class="brush: js; highlight[ 1, 3 - 5 ,2 ];"foo\nbar\nbaz\nbax\nbix</pre>' +
           '<pre class="brush: js; highlight[0];">foo\nbar</pre>' +
           '<pre class="brush: js; highlight[-1];">foo\nbar</pre>' +
           '<pre class="brush: js; highlight[3];">foo\nbar</pre>' +
           '<pre class="brush: js; highlight[3];">foo<br>bar</pre>' +
           '<pre class="brush: js; highlight[3];">foo<br/>bar</pre>' +
           '<pre class="brush: js; highlight:[3];">foo<br>bar</pre>' +
           '<pre class="brush: js; highlight[1,-3--5,3];">foo\nbar\nbaz</pre>' +
           '<pre class="brush: js; highlight [ 1, 3 - 6 ,2 ];">foo\nbar\nbaz</pre>',
      expected: [
        {
          msg: "highlighted_line_number_not_positive",
          msgParams: ["0", "0"]
        },
        {
          msg: "highlighted_line_number_not_positive",
          msgParams: ["-1", "-1"]
        },
        {
          msg: "highlighted_line_number_too_big",
          msgParams: ["3", "2", "3"]
        },
        {
          msg: "highlighted_line_number_too_big",
          msgParams: ["3", "2", "3"]
        },
        {
          msg: "highlighted_line_number_too_big",
          msgParams: ["3", "2", "3"]
        },
        {
          msg: "highlighted_line_number_too_big",
          msgParams: ["3", "2", "3"]
        },
        {
          msg: "highlighted_line_number_not_positive",
          msgParams: ["-3", "1,-3--5,3"]
        },
        {
          msg: "highlighted_line_number_not_positive",
          msgParams: ["-5", "1,-3--5,3"]
        },
        {
          msg: "invalid_highlighted_range",
          msgParams: ["-3", "-5", "1,-3--5,3"]
        },
        {
          msg: "highlighted_line_number_too_big",
          msgParams: ["6", "3", " 1, 3 - 6 ,2 "]
        }
      ]
    }
  ];

  runTests(assert, done, "wrongHighlightedLine", "wrong highlighted line", url, tests);
};

exports["test doc apiSyntaxHeadlines"] = function testSummaryHeading(assert, done) {
  const tests = [
    {
      str: '<h2 id="Syntax">Syntax</h2>' +
           '<h3>Errors</h3>' +
           '<h3>Returns</h3>' +
           '<h3>Parameters</h3>',
      expected: [
        {
          msg: "invalid_headline_name",
          msgParams: ["Errors"]
        },
        {
          msg: "invalid_headline_name",
          msgParams: ["Returns"]
        },
        {
          msg: "invalid_headline_order",
        },
        {
          msg: "invalid_headline_order",
        }
      ]
    }
  ];

  runTests(assert, done, "apiSyntaxHeadlines", "API syntax headline", url, tests);
};

exports["test doc codeInPre"] = function testSummaryHeading(assert, done) {
  const tests = [
    {
      str: '<pre>no code</pre>' +
           '<pre class="brush:js">no code</pre>' +
           '<pre class="brush:js"><code>some code</code></pre>' +
           '<pre class="brush:js"><code>some code</code><code>some more inline code</code></pre>' +
           '<pre class="brush:js">foo\n<code>some code</code>\nbar<br>\n<code>some code with\nline break</code>\nbaz</pre>',
      expected: [
        '<code>some code</code>',
        '<code>some code</code>',
        '<code>some more inline code</code>',
        '<code>some code</code>',
        '<code>some code with\nline break</code>'
      ]
    }
  ];

  runTests(assert, done, "codeInPre", "<code> in <pre>", url, tests);
};

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
          msgParams: ["brush:js"]
        }
      ]
    },
    {
      str: 'foo<h2>Syntax</h2>\\n<pre class=\"brush:css\">syntax examples</pre>bar<h3>Formal syntax</h3>\\n<pre class=\"eval\">syntax</pre>baz<h2>Other section</h2>',
      expected: [
        {
          msg: "wrong_syntax_class_used",
          msgParams: ["eval"]
        }
      ]
    }
  ];

  runTests(assert, done, "wrongSyntaxClass", "syntax box class", url, tests);
};

exports["test doc lineLengthInPre"] = function testSummaryHeading(assert, done) {
  const tests = [
    {
      str: '<pre>11111111111111111111111 11111111111111111111111 111111111111 111111111111111 1</pre>' +
           '<pre>11111111111111111111111 11111111111111111111111<br> 111111111111 111111111111111 1</pre>' +
           '<pre class="brush:js">short\nstuff</pre>' +
           '<pre class="brush:js">foo\nsome code\nbar<br>\n' +
           'some code with\nline break\nbaz' +
           '11111111111 111111111111 function{ foo(); 11111111111111 bar 1111111111111111 111</pre>',
      expected: [
        '11111111111111111111111 11111111111111111111111 111111111111 111111111111111 1',
        'baz11111111111 111111111111 function{ foo(); 11111111111111 bar 1111111111111111 111'
      ]
    }
  ];

  runTests(assert, done, "lineLengthInPre", "too long line", url, tests);
};

require("sdk/test").run(exports);