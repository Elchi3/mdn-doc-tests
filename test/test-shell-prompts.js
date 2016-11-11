const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc shellPrompts"] = function testShellPrompts(assert, done) {
  const tests = [
    {
      str: '<pre>somecommand</pre>' +
           '<pre>$somecommand</pre>' +
           '<pre>$ somecommand</pre>' +
           '<pre>&gt;somecommand</pre>' +
           '<pre>&gt; somecommand</pre>' +
           '<pre>$ somecommand\noutput<br>$ anothercommand</pre>',
      expected: [
        {
          msg: '$somecommand',
          type: ERROR
        },
        {
          msg: '$ somecommand',
          type: ERROR
        },
        {
          msg: '&gt;somecommand',
          type: ERROR
        },
        {
          msg: '&gt; somecommand',
          type: ERROR
        },
        {
          msg: '$ somecommand',
          type: ERROR
        },
        {
          msg: '$ anothercommand',
          type: ERROR
        }
      ]
    }
  ];

  runTests(assert, done, "shellPrompts", "Shell prompts in code samples", url, tests);
};

require("sdk/test").run(exports);