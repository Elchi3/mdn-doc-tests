const {url, runTests} = require("./testutils");

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
        '$somecommand',
        '$ somecommand',
        '&gt;somecommand',
        '&gt; somecommand',
        '$ somecommand',
        '$ anothercommand'
      ]
    }
  ];

  runTests(assert, done, "shellPrompts", "shell prompts in code samples", url, tests);
};

require("sdk/test").run(exports);