const {url, runTests} = require("./testutils");

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

require("sdk/test").run(exports);