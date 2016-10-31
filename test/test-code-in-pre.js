const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc codeInPre"] = function testSummaryHeading(assert, done) {
  const tests = [
    {
      str: '<pre>no code</pre>' +
           '<pre class="brush:js">no code</pre>' +
           '<pre class="brush:js"><code>some code</code></pre>' +
           '<pre class="brush:js"><code>some code</code><code>some more inline code</code></pre>' +
           '<pre class="brush:js">foo\n<code>some code</code>\nbar<br>\n<code>some code with\nline break</code>\nbaz</pre>',
      expected: [
        {
          msg: '<code>some code</code>',
          type: ERROR
        },
        {
          msg: '<code>some code</code>',
          type: ERROR
        },
        {
          msg: '<code>some more inline code</code>',
          type: ERROR
        },
        {
          msg: '<code>some code</code>',
          type: ERROR
        },
        {
          msg: '<code>some code with\nline break</code>',
          type: ERROR
        }
      ],
      expectedAfterFixing: []
    }
  ];

  runTests(assert, done, "codeInPre", "<code> in <pre>", url, tests);
};

require("sdk/test").run(exports);