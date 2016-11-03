const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc exampleColonHeading"] = function testExampleColonHeading(assert, done) {
  const tests = [
    {
      str: '<h2>Example</h2>' +
           '<h3 id="Example">Example</h3>' +
           '<h3 id="Example:_Foo">Example: Foo</h3>' +
           '<h3 id="Example:_Using_Math.sin">Example: Using <code>Math.sin</code></h3>' +
           '<h2 id="Example:_Foo">Example: Foo</h2>',
      expected: [
        {
          msg: '<h3 id="Example:_Foo">Example: Foo</h3>',
          type: ERROR
        },
        {
          msg: '<h3 id="Example:_Using_Math.sin">Example: Using <code>Math.sin</code></h3>',
          type: ERROR
        },
        {
          msg: '<h2 id="Example:_Foo">Example: Foo</h2>',
          type: ERROR
        }
      ],
      expectedAfterFixing: []
    }
  ];

  runTests(assert, done, "exampleColonHeading", "'Example: ' heading", url, tests);
};

require("sdk/test").run(exports);