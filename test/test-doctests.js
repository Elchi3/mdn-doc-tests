var testFile = require("sdk/self").data.load("doctests.js");

eval(testFile);

exports["test doc regexp oldURLs"] = function(assert) {
  const str = '<a href="/en/Web">Web</a><a href="/En/Mozilla">Mozilla</a>';
  const expected = [
    ' href="/en/Web"',
    ' href="/En/Mozilla"'
  ];
  var matches = str.match(docTests["oldURLs"].regex);

  assert.equal(matches.length, expected.length, "Number of '/en/' link matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match, expected[i], "Error message for '/en/' link match must be correct");
  });
};

exports["test doc regexp emptyElem"] = function(assert) {
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
  var matches = docTests["emptyElem"].check(str);

  assert.equal(matches.length, expected.length, "Number of empty element matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i], "Error message for empty element match must be correct");
  });
};

exports["test doc regexp languagesMacro"] = function(assert) {
  const str = '{{ languages( { "ja": "Ja/Browser_chrome_tests" } ) }}';
  const expected = [
    '{{ languages( { "ja": "Ja/Browser_chrome_tests" } ) }}'
  ];
  var matches = str.match(docTests["languagesMacro"].regex);

  assert.equal(matches.length, expected.length, "Number of {{languages}} macro matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match, expected[i], "Error message for {{languages}} macro match must be correct");
  });
};

exports["test doc regexp emptyBrackets"] = function(assert) {
  const str = '{{ foo() }}' +
              '{{bar()}}' +
              '{{foobar("abc")}}' +
              '{{baz}}';
  const expected = [
    '{{ foo() }}',
    '{{bar()}}'
  ];
  var matches = str.match(docTests["emptyBrackets"].regex);

  assert.equal(matches.length, expected.length, "Number of empty brackets matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match, expected[i], "Error message for empty brackets match must be correct");
  });
};

exports["test doc regexp styleAttribute"] = function(assert) {
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
  var matches = str.match(docTests["styleAttribute"].regex);

  assert.equal(matches.length, expected.length, "Number of 'style' attribute matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match, expected[i], "Error message for 'style' attribute match must be correct");
  });
};

exports["test doc regexp nameAttribute"] = function(assert) {
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
  var matches = str.match(docTests["nameAttribute"].regex);

  assert.equal(matches.length, expected.length, "Number of 'name' attribute matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match, expected[i], "Error message for 'name' attribute match must be correct");
  });
};

exports["test doc regexp spanCount"] = function(assert) {
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

exports["test doc regexp preWithoutClass"] = function(assert) {
  const str = '<pre class="brush: js"></pre>' +
              '<pre>foobar;</pre>' +
              '<pre class="syntaxbox"></pre>' +
              '<pre id="foo"></pre>' +
              '<pre> \n\r foo</pre>';
  const expected = [
    '<pre>foobar;</pre>',
    '<pre id="foo"></pre>',
    '<pre> \n\r foo</pre>'
  ];
  var matches = str.match(docTests["preWithoutClass"].regex);

  assert.equal(matches.length, expected.length, "Number of <pre> w/o class matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match, expected[i], "Error message for <pre> w/o class match must be correct");
  });
};

exports["test doc regexp summaryHeading"] = function(assert) {
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
  var matches = str.match(docTests["summaryHeading"].regex);

  assert.equal(matches.length, expected.length, "Number of summary heading matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match, expected[i], "Error message for summary heading match must be correct");
  });
};

exports["test doc regexp jsRefWithParams"] = function(assert) {
  const str = '{{JSRef()}}' +
              '{{JSRef("Global_Objects")}}' +
              '{{JSRef("Global_Objects", "Math")}}' +
              '{{JSRef}}';
  const expected = [
    '{{JSRef()}}',
    '{{JSRef("Global_Objects")}}',
    '{{JSRef("Global_Objects", "Math")}}'
  ];
  var matches = str.match(docTests["jsRefWithParams"].regex);

  assert.equal(matches.length, expected.length, "Number of {{JSRef}} with params matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match, expected[i], "Error message for {{JSRef}} with params match must be correct");
  });
};

exports["test doc regexp exampleColonHeading"] = function(assert) {
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
  var matches = str.match(docTests["exampleColonHeading"].regex);

  assert.equal(matches.length, expected.length, "Number of 'Example: ' heading matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match, expected[i], "Error message for 'Example: ' heading match must be correct");
  });
};

exports["test doc regexp alertPrintInCode"] = function(assert) {
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

exports["test doc regexp htmlComments"] = function(assert) {
  const str = '<!-- -->' +
              '<!-- <span>foo</span> -->' +
              '<!-- hello \n world -->';
  const expected = [
    '<!-- -->',
    '<!-- <span>foo</span> -->',
    '<!-- hello \n world -->'
  ];
  var matches = str.match(docTests["htmlComments"].regex);

  assert.equal(matches.length, expected.length, "Number of HTML comment matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match, expected[i], "Error message for HTML comment match must be correct");
  });
};

exports["test doc regexp fontElements"] = function(assert) {
  const str = '<font>' +
              '<font face="Open Sans, sans-serif">';
  const expected = [
    '<font>',
    '<font face="Open Sans, sans-serif">'
  ];
  var matches = str.match(docTests["fontElements"].regex);

  assert.equal(matches.length, expected.length, "Number of <font> matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match, expected[i], "Error message for <font> match must be correct");
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
  var matches = str.match(docTests["httpLinks"].regex);

  assert.equal(matches.length, expected.length, "Number of HTTP link matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match, expected[i], "Error message for HTTP link match must be correct");
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
  const str = '<pre class="brush: js; highlight[2];">bla\nblubb</pre>' +
              '<pre class="brush:js;">bla\nblubb</pre>' +
              '<pre class="highlight[1]; brush:js;">bla\nblubb</pre>' +
              '<pre class="brush: js; highlight[0];">bla\nblubb</pre>' +
              '<pre class="brush: js; highlight[-1];">bla\nblubb</pre>' +
              '<pre class="brush: js; highlight[3];">bla\nblubb</pre>' +
              '<pre class="brush: js; highlight[3];">bla<br>blubb</pre>' +
              '<pre class="brush: js; highlight[3];">bla<br/>blubb</pre>';
  const expected = [
    {
      msg: "highlighted_line_number_not_positive"
    },
    {
      msg: "highlighted_line_number_not_positive"
    },
    {
      msg: "highlighted_line_number_too_big",
      msgParams: ["3", "2"]
    },
    {
      msg: "highlighted_line_number_too_big",
      msgParams: ["3", "2"]
    },
    {
      msg: "highlighted_line_number_too_big",
      msgParams: ["3", "2"]
    }
  ];
  var matches = docTests["wrongHighlightedLine"].check(str);

  assert.equal(matches.length, expected.length, "Number of wrong highlighted line matches must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i].msg, "Error message for wrong highlighted line match must be correct");
    assert.deepEqual(match.msgParams, expected[i].msgParams, "Error message params for wrong highlighted line match must be correct");
  });
};

exports["test doc headlinesWording"] = function(assert) {
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
  var matches = docTests["headlinesWording"].check(str);

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

exports["test doc preLineTooLong"] = function(assert) {
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
  var matches = docTests["preLineTooLong"].check(str);

  assert.equal(matches.length, expected.length, "Number of too long line in <pre> errors must be " + expected.length);
  matches.forEach((match, i) => {
    assert.equal(match.msg, expected[i], "Error message for too long line in <pre> errors must be correct");
  });
};

require("sdk/test").run(exports);