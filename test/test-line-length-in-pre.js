const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc lineLengthInPre"] = function testSummaryHeading(assert, done) {
  const tests = [
    {
      str: '<pre>11111111111111111111111 11111111111111111111111 111111111111 111111111111111 1</pre>' +
           '<pre>11111111111111111111111 11111111111111111111111<br> 111111111111 111111111111111 1</pre>' +
           '<pre class="brush:js">short\nstuff</pre>' +
           '<pre class="brush:js">Code having some <a href="http://somenonexistentpage.com/path/to/script">link</a>.</pre>' +
           '<pre class="brush:js">foo\nsome code\nbar<br>\n' +
           'some code with\nline break\nbaz' +
           '11111111111 111111111111 function{ foo(); 11111111111111 bar 1111111111111111 111</pre>',
      expected: [
        {
          msg: '11111111111111111111111 11111111111111111111111 111111111111 111111111111111 1',
          type: WARNING
        },
        {
          msg: 'baz11111111111 111111111111 function{ foo(); 11111111111111 bar 1111111111111111 111',
          type: WARNING
        }
      ]
    }
  ];

  runTests(assert, done, "lineLengthInPre", "too long line", url, tests);
};

require("sdk/test").run(exports);