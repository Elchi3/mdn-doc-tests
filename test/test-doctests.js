var testFile = require("sdk/self").data.load("doctests.js")

eval(testFile);

exports["test doc regexp oldURLs"] = function(assert) {
  var str = '<a href="/en/Web">Web</a><a href="/En/Mozilla">Mozilla</a>';
  var test = str.match(docTests[0].regex);
  assert.ok(2 == test.length , "test that 'en/' links are matched");
};

exports["test doc regexp emptyElem"] = function(assert) {
  var str = '<p> </p>' +
            '<p> \n\r </p>' +
            '<p> &nbsp;</p>' +
            '<p><br><br/></p>' +
            '<img src="http://example.com/image.png">' +
            '<input value="test"/>' +
            '<p><span>some text</span></p>' +
            '<p>some text</p>';
  var test = docTests[1].check(str);
  assert.ok(test.length === 4, "test that empty elements are matched");
};

exports["test doc regexp languagesMacro"] = function(assert) {
  var str = '{{ languages( { "ja": "Ja/Browser_chrome_tests" } ) }}';
  var test = str.match(docTests[2].regex);
  assert.ok(1 == test.length , "test that the {{languages}} macro is matched");
};

exports["test doc regexp emptyBrackets"] = function(assert) {
  var str = '{{ foo() }} {{bar()}} {{foobar("abc")}} {{baz}}';
  var test = str.match(docTests[3].regex);
  assert.ok(2 == test.length , "test that {{foo()}} macros are matched");
};

exports["test doc regexp styleAttribute"] = function(assert) {
  var str = '<span style=""></span>' +
            '<div style="margin-top:5%"></div>' +
            '<section style="background:#fff; color: rgb(234, 234, 234);"></section>' +
            '<b style=\'padding: 5px !important\'>test</b>' +
            '<span style="font-family: \'Open Sans\', serif; line-height: 1.5"></span>';
  var test = str.match(docTests[4].regex);
  assert.ok(5 == test.length , "test that style= attributes are matched");
};

exports["test doc regexp nameAttribute"] = function(assert) {
  var str = '<span name=""></span>' +
            '<div name="foo"></div>' +
            '<h2 id="foo" name="foo">foo</h2>' +
            '<h2 id="foo_bar" name="foo_bar">foo bar</h2>' +
            '<h3 name=\'baz\'>baz</h3>';
  var test = str.match(docTests[5].regex);
  assert.ok(5 == test.length , "test that name= attributes are matched");
};

exports["test doc regexp spanCount"] = function(assert) {
  var str = '<span>what?</span>' +
            '<p>nope</p>' +
            '<span class="foo" style="font:10px">bar</span>' +
            '<span><dt>foobar</dt></span>' +
            '<span class="seoSummary">seoseoseo</span>';
  var test = docTests[6].check(str);
  assert.ok(3 == test.length , "test that <span> elements are found");
};

exports["test doc regexp preWithoutClass"] = function(assert) {
  var str = '<pre class="brush: js"></pre>' +
            '<pre>foobar;</pre>' +
            '<pre class="syntaxbox"></pre>' +
            '<pre id="foo"></pre>' +
            "<pre> \n\r foo</pre>";
  var test = str.match(docTests[7].regex);
  assert.ok(3 == test.length , "test that <pre> elements w/o syntax highlighter are found");
};

exports["test doc regexp summaryHeading"] = function(assert) {
  var str = '<h2>Summary</h2>' +
            '<h2 id="Summary" name="Summary">Summary</h2>' +
            '<h2 id="Summary" name="foo">Summary</h2>' +
            '<h3 id="Summary">Summary</h3>';
  var test = str.match(docTests[8].regex);
  assert.ok(4 == test.length , "test that Summary headings are matched");
};

exports["test doc regexp jsRefWithParams"] = function(assert) {
  var str = '{{JSRef()}}' +
            '{{JSRef("Global_Objects")}}' +
            '{{JSRef("Global_Objects", "Math")}}' +
            '{{JSRef}}';
  var test = str.match(docTests[9].regex);
  assert.ok(3 == test.length , "test that JSRef macros with parameters are matched");
};

exports["test doc regexp ExampleColonHeading"] = function(assert) {
  var str = '<h2>Example</h2>' +
            '<h3 id="Example">Example</h3>' +
            '<h3 id="Example:_Foo">Example: Foo</h3>' +
            '<h3 id="Example:_Using_Math.sin">Example: Using <code>Math.sin</code></h3>' +
            '<h2 id="Example:_Foo">Example: Foo</h2>';
  var test = str.match(docTests[10].regex);
  assert.ok(3 == test.length , "test that headings with _Example:_ are matched");
};

exports["test doc regexp alertPrintInCode"] = function(assert) {
  var str = '<pre>alert("foo")</pre>' +
            '<pre class="syntaxbox">print("bar")</pre>' +
            '<pre>var someOthercode = baz; ' +
            'alert("hello world"); \n var moreCode;</pre>' +
            '<pre>document.write("foobar");</pre>';
  var test = docTests[11].check(str);
  assert.ok(4 == test.length , "test that alert, print, eval and d.write statements are matched");
};

exports["test doc regexp htmlComments"] = function(assert) {
  var str = '<!-- -->' +
            '<!-- <span>foo</span> -->' +
            '<!-- hello \n world -->';
  var test = str.match(docTests[12].regex);
  assert.ok(3 == test.length , "test that html comments are matched");
};

exports["test doc regexp fontElement"] = function(assert) {
  var str = '<font>' +
            '<font face="Open Sans, sans-serif">';
  var test = str.match(docTests[13].regex);
  assert.ok(2 === test.length, "test that <font> tags are matched");
};

exports["test doc httpLinks"] = function(assert) {
  var str = '<a href="https://somepage.com">some page</a>' +
            '<a href="ftp://somepage.com">some page</a>' +
            '<a href="https://somepage.com?url=http://anotherpage.com">some page</a>' +
            '<a href="http://somepage.com">some page</a>';
  var test = str.match(docTests[14].regex);
  assert.ok(test.length === 1, "test that HTTP links are matched");
};

exports["test doc macroSyntaxError"] = function(assert) {
  var str = '{{macro}}' +
            '{{macro("param")}}' +
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
  var test = docTests[15].check(str);
  assert.ok(test.length === 15, "test that macro syntax errors are recognized " + test.length);
};

require("sdk/test").run(exports);