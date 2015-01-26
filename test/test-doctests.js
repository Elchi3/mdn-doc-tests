var testFile = require("sdk/self").data.load("doctests.js");

var docTests = JSON.parse(testFile);

exports["test doc regexp oldURLs"] = function(assert) {
  var str = '<a href="/en/Web">Web</a><a href="/En/Mozilla">Mozilla</a>';
  var test = str.match(new RegExp(docTests[0].regex, 'gi'));
  assert.ok(2 == test.length , "test that 'en/' links are matched");
};

exports["test doc regexp emptyElem"] = function(assert) {
  var str = '<p></p>';
  var test = str.match(new RegExp(docTests[1].regex, 'gi'));
  assert.ok(1 == test.length , "test that empty <p></p> are matched");
};

exports["test doc regexp languagesMacro"] = function(assert) {
  var str = '{{ languages( { "ja": "Ja/Browser_chrome_tests" } ) }}';
  var test = str.match(new RegExp(docTests[2].regex, 'gi'));
  assert.ok(1 == test.length , "test that the {{languages}} macro is matched");
};

exports["test doc regexp emptyBrackets"] = function(assert) {
  var str = '{{ foo() }} {{bar()}} {{foobar("abc")}} {{baz}}';
  var test = str.match(new RegExp(docTests[3].regex, 'gi'));
  assert.ok(2 == test.length , "test that {{foo()}} macros are matched");
};

exports["test doc regexp styleAttribute"] = function(assert) {
  var str = '<span style=""></span>' +
            '<div style="margin-top:5%"></div>' +
            '<section style="background:#fff; color: rgb(234, 234, 234);"></section>' +
            '<b style=\'padding: 5px !important\'>test</b>' +
            '<span style="font-family: \'Open Sans\', serif; line-height: 1.5"></span>'
  var test = str.match(new RegExp(docTests[4].regex, 'gi'));
  assert.ok(5 == test.length , "test that style= attributes are matched");
};

exports["test doc regexp spanCount"] = function(assert) {
  var str = '<span>what?</span>' +
            '<p>nope</p>' +
            '<span class="foo" style="font:10px">bar</span>' +
            '<span><dt>foobar</dt></span>';
  var test = str.match(new RegExp(docTests[5].regex, 'gi'));
  assert.ok(3 == test.length , "test that <span> elements are found");
};

require("sdk/test").run(exports);