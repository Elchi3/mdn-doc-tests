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


require("sdk/test").run(exports);
