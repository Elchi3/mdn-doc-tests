var testFile = require("sdk/self").data.load("doctests.js");

eval(testFile);

exports["test doc oldURLs"] = function(assert) {
  const str = '<a href="/en/Web">Web</a><a href="/En/Mozilla">Mozilla</a>';
  const expected = [
    ' href="/en/Web"',
    ' href="/En/Mozilla"'
  ];
  var matches = docTests["oldURLs"].check(str);

  assert.equal(matches.length, expected.length, "Number of '/en/' link matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i], "Error message for '/en/' link match must be correct");
  });
};

exports["test doc emptyElements"] = function(assert) {
  const str = '<p> </p>' +
              '<p> \n\r </p>' +
              '<p> &nbsp;</p>' +
              '<p><br><br/></p>' +
              '<img src="http://example.com/image.png">' +
              '<input value="test"/>' +
              '<p><span>some text</span></p>' +
              '<p>some text</p>';
  const expected = [
    '<p> </p>',
    '<p> \n\r </p>',
    '<p> &nbsp;</p>',
    '<p><br><br/></p>'
  ];
  var matches = docTests["emptyElements"].check(str);

  assert.equal(matches.length, expected.length, "Number of empty element matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i], "Error message for empty element match must be correct");
  });
};

exports["test doc languagesMacro"] = function(assert) {
  const str = '{{ languages( { "ja": "Ja/Browser_chrome_tests" } ) }}';
  const expected = [
    '{{ languages( { "ja": "Ja/Browser_chrome_tests" } ) }}'
  ];
  var matches = docTests["languagesMacro"].check(str);

  assert.equal(matches.length, expected.length, "Number of {{languages}} macro matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i], "Error message for {{languages}} macro match must be correct");
  });
};

exports["test doc emptyBrackets"] = function(assert) {
  const str = '{{ foo() }}' +
              '{{bar()}}' +
              '{{foobar("abc")}}' +
              '{{baz}}';
  const expected = [
    '{{ foo() }}',
    '{{bar()}}'
  ];
  var matches = docTests["emptyBrackets"].check(str);

  assert.equal(matches.length, expected.length, "Number of empty brackets matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i], "Error message for empty brackets match must be correct");
  });
};

exports["test doc styleAttribute"] = function(assert) {
  const str = '<span style=""></span>' +
              '<div style="margin-top:5%"></div>' +
              '<section style="background:#fff; color: rgb(234, 234, 234);"></section>' +
              '<b style=\'padding: 5px !important\'>test</b>' +
              '<span style="font-family: \'Open Sans\', serif; line-height: 1.5"></span>';
  const expected = [
    'style=""',
    'style="margin-top:5%"',
    'style="background:#fff; color: rgb(234, 234, 234);"',
    'style=\'padding: 5px !important\'',
    'style="font-family: \'Open Sans\', serif; line-height: 1.5"'
  ];
  var matches = docTests["styleAttribute"].check(str);

  assert.equal(matches.length, expected.length, "Number of 'style' attribute matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i], "Error message for 'style' attribute match must be correct");
  });
};

exports["test doc nameAttribute"] = function(assert) {
  const str = '<span name=""></span>' +
              '<div name="foo"></div>' +
              '<h2 id="foo" name="foo">foo</h2>' +
              '<h2 id="foo_bar" name="foo_bar">foo bar</h2>' +
              '<h3 name=\'baz\'>baz</h3>';
  const expected = [
    'name=""',
    'name="foo"',
    'name="foo"',
    'name="foo_bar"',
    'name=\'baz\''
  ];
  var matches = docTests["nameAttribute"].check(str);

  assert.equal(matches.length, expected.length, "Number of 'name' attribute matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i], "Error message for 'name' attribute match must be correct");
  });
};

exports["test doc spanCount"] = function(assert) {
  const str = '<span>what?</span>' +
              '<p>nope</p>' +
              '<span class="foo" style="font:10px">bar</span>' +
              '<span><dt>foobar</dt></span>' +
              '<span class="seoSummary">seoseoseo</span>';
  const expected = [
    '<span>what?</span>',
    '<span class="foo" style="font:10px">bar</span>',
    '<span><dt>foobar</dt></span>'
  ];
  var matches = docTests["spanCount"].check(str);

  assert.equal(matches.length, expected.length, "Number of <span> matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i], "Error message for <span> match must be correct");
  });
};

exports["test doc preWithoutClass"] = function(assert) {
  const str = '<pre class="brush: js"></pre>' +
              '<pre>foobar;</pre>' +
              '<pre class="syntaxbox"></pre>' +
              '<pre id="foo"></pre>' +
              '<pre class="">foo</pre>' +
              '<pre> \n\r foo</pre>';
  const expected = [
    '<pre>foobar;</pre>',
    '<pre id="foo"></pre>',
    '<pre class="">foo</pre>',
    '<pre> \n\r foo</pre>'
  ];
  var matches = docTests["preWithoutClass"].check(str);

  assert.equal(matches.length, expected.length, "Number of <pre> w/o class matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i], "Error message for <pre> w/o class match must be correct");
  });
};

exports["test doc summaryHeading"] = function(assert) {
  const str = '<h2>Summary</h2>' +
              '<h2 id="Summary" name="Summary">Summary</h2>' +
              '<h2 id="Summary" name="foo">Summary</h2>' +
              '<h3 id="Summary">Summary</h3>';
  const expected = [
    '<h2>Summary</h2>',
    '<h2 id="Summary" name="Summary">Summary</h2>',
    '<h2 id="Summary" name="foo">Summary</h2>',
    '<h3 id="Summary">Summary</h3>'
  ];
  var matches = docTests["summaryHeading"].check(str);

  assert.equal(matches.length, expected.length, "Number of summary heading matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i], "Error message for summary heading match must be correct");
  });
};

exports["test doc jsRefWithParams"] = function(assert) {
  const str = '{{JSRef()}}' +
              '{{JSRef("Global_Objects")}}' +
              '{{JSRef("Global_Objects", "Math")}}' +
              '{{JSRef}}';
  const expected = [
    '{{JSRef()}}',
    '{{JSRef("Global_Objects")}}',
    '{{JSRef("Global_Objects", "Math")}}'
  ];
  var matches = docTests["jsRefWithParams"].check(str);

  assert.equal(matches.length, expected.length, "Number of {{JSRef}} with params matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i], "Error message for {{JSRef}} with params match must be correct");
  });
};

exports["test doc exampleColonHeading"] = function(assert) {
  const str = '<h2>Example</h2>' +
              '<h3 id="Example">Example</h3>' +
              '<h3 id="Example:_Foo">Example: Foo</h3>' +
              '<h3 id="Example:_Using_Math.sin">Example: Using <code>Math.sin</code></h3>' +
              '<h2 id="Example:_Foo">Example: Foo</h2>';
  const expected = [
    '<h3 id="Example:_Foo">Example: Foo</h3>',
    '<h3 id="Example:_Using_Math.sin">Example: Using <code>Math.sin</code></h3>',
    '<h2 id="Example:_Foo">Example: Foo</h2>'
  ];
  var matches = docTests["exampleColonHeading"].check(str);

  assert.equal(matches.length, expected.length, "Number of 'Example: ' heading matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i], "Error message for 'Example: ' heading match must be correct");
  });
};

exports["test doc alertPrintInCode"] = function(assert) {
  const str = '<pre>alert("foo")</pre>' +
              '<pre class="syntaxbox">print("bar")</pre>' +
              '<pre>var someOthercode = baz; ' +
              'alert("hello world"); \n var moreCode;</pre>' +
              '<pre>document.write("foobar");</pre>';
  const expected = [
    'alert("foo")',
    'print("bar")',
    'alert("hello world")',
    'document.write("foobar")'
  ];
  var matches = docTests["alertPrintInCode"].check(str);

  assert.equal(matches.length, expected.length, "Number of alert()/print()/eval()/document.write() matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i], "Error message for alert()/print()/eval()/document.write() match must be correct");
  });
};

exports["test doc htmlComments"] = function(assert) {
  const str = '<!-- -->' +
              '<!-- <span>foo</span> -->' +
              '<!-- hello \n world -->';
  const expected = [
    '<!-- -->',
    '<!-- <span>foo</span> -->',
    '<!-- hello \n world -->'
  ];
  var matches = docTests["htmlComments"].check(str);

  assert.equal(matches.length, expected.length, "Number of HTML comment matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i], "Error message for HTML comment match must be correct");
  });
};

exports["test doc fontElements"] = function(assert) {
  const str = '<font>' +
              '<font face="Open Sans, sans-serif">';
  const expected = [
    '<font>',
    '<font face="Open Sans, sans-serif">'
  ];
  var matches = docTests["fontElements"].check(str);

  assert.equal(matches.length, expected.length, "Number of <font> matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i], "Error message for <font> match must be correct");
  });
};

exports["test doc httpLinks"] = function(assert) {
  const str = '<a href="https://somepage.com">some page</a>' +
              '<a href="ftp://somepage.com">some page</a>' +
              '<a href="https://somepage.com?url=http://anotherpage.com">some page</a>' +
              '<a href="http://somepage.com">some page</a>';
  const expected = [
    '<a href="http://'
  ];
  var matches = docTests["httpLinks"].check(str);

  assert.equal(matches.length, expected.length, "Number of HTTP link matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i], "Error message for HTTP link match must be correct");
  });
};

exports["test doc macroSyntaxError"] = function(assert) {
  const str = '{{macro}}' +
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
              '{{macro(param"))}}'; // Missing opening double quote and double closing parameter list bracket
  const expected = [
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
  ];
  var matches = docTests["macroSyntaxError"].check(str);

  assert.equal(matches.length, expected.length, "Number of macro syntax error matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i].msg, "Error message for macro syntax error match must be correct");
    assert.deepEqual(match.msgParams, expected[i].msgParams, "Error message params for macro syntax error match must be correct");
  });
};

exports["test doc wrongHighlightedLine"] = function(assert) {
  const str = '<pre class="brush: js; highlight[2];">foo\nbar</pre>' +
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
              '<pre class="brush: js; highlight [ 1, 3 - 6 ,2 ];">foo\nbar\nbaz</pre>';
  const expected = [
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
  ];
  var matches = docTests["wrongHighlightedLine"].check(str);

  assert.equal(matches.length, expected.length, "Number of wrong highlighted line matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i].msg, "Error message for wrong highlighted line match must be correct");
    assert.deepEqual(match.msgParams, expected[i].msgParams, "Error message params for wrong highlighted line match must be correct");
  });
};

exports["test doc apiSyntaxHeadlines"] = function(assert) {
  const str = '<h2 id="Syntax">Syntax</h2>' +
              '<h3>Errors</h3>' +
              '<h3>Returns</h3>' +
              '<h3>Parameters</h3>';
  const expected = [
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
  ];
  var matches = docTests["apiSyntaxHeadlines"].check(str);

  assert.equal(matches.length, expected.length, "Number of API syntax headline errors must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i].msg, "Error message for API syntax headline errors must be correct");
    assert.deepEqual(match.msgParams, expected[i].msgParams, "Error message params for API syntax headline errors must be correct");
  });
};

exports["test doc codeInPre"] = function(assert) {
  const str = '<pre>no code</pre>' +
              '<pre class="brush:js">no code</pre>' +
              '<pre class="brush:js"><code>some code</code></pre>' +
              '<pre class="brush:js"><code>some code</code><code>some more inline code</code></pre>' +
              '<pre class="brush:js">foo\n<code>some code</code>\nbar<br>\n<code>some code with\nline break</code>\nbaz</pre>';
  const expected = [
    '<code>some code</code>',
    '<code>some code</code>',
    '<code>some more inline code</code>',
    '<code>some code</code>',
    '<code>some code with\nline break</code>'
  ];
  var matches = docTests["codeInPre"].check(str);

  assert.equal(matches.length, expected.length, "Number of <code> in <pre> errors must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i], "Error message for <code> in <pre> errors must be correct");
  });
};

exports["test doc lineLengthInPre"] = function(assert) {
  const str = '<pre>11111111111111111111111 11111111111111111111111 111111111111 111111111111111 1</pre>' +
              '<pre>11111111111111111111111 11111111111111111111111<br> 111111111111 111111111111111 1</pre>' +
              '<pre class="brush:js">short\nstuff</pre>' +
              '<pre class="brush:js">foo\nsome code\nbar<br>\n' +
              'some code with\nline break\nbaz' +
              '11111111111 111111111111 function{ foo(); 11111111111111 bar 1111111111111111 111</pre>';
  const expected = [
    '11111111111111111111111 11111111111111111111111 111111111111 111111111111111 1',
    'baz11111111111 111111111111 function{ foo(); 11111111111111 bar 1111111111111111 111'
  ];
  var matches = docTests["lineLengthInPre"].check(str);

  assert.equal(matches.length, expected.length, "Number of too long line in <pre> errors must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i], "Error message for too long line in <pre> errors must be correct");
  });
};

require("sdk/test").run(exports);