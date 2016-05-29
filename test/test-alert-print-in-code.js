const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc alertPrintInCode"] = function testAlertPrintInCode(assert, done) {
  const tests = [
    {
      str: '<pre>alert("foo")</pre>' +
           '<pre class="syntaxbox">print("bar")</pre>' +
           '<pre>let someOthercode = baz; ' +
           'alert("hello world"); \n let moreCode;</pre>' +
           '<pre>document.write("foobar");</pre>',
      expected: [
        {
          msg: 'alert("foo")',
          type: ERROR
        },
        {
          msg: 'print("bar")',
          type: ERROR
        },
        {
          msg: 'alert("hello world")',
          type: ERROR
        },
        {
          msg: 'document.write("foobar")',
          type: ERROR
        }
      ]
    }
  ];

  runTests(assert, done, "alertPrintInCode", "alert()/print()/eval()/document.write()", url, tests);
};

require("sdk/test").run(exports);