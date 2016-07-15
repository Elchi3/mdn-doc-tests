const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc preWithoutClass"] = function testPresWithoutClass(assert, done) {
  const tests = [
    {
      str: '<pre class="brush: js"></pre>' +
           '<pre class="syntaxbox"></pre>' +
           '<pre>folder/\n  file</pre>' +
           '<pre>foobar;</pre>' +
           '<pre>/* comment */\nvar code;</pre>' +
           '<pre>@rule param {\n  descriptor: value;\n}</pre>' +
           '<pre>&lt;tag&gt;</pre>' +
           '<pre id="foo"></pre>' +
           '<pre class="">foo</pre>' +
           '<pre> \n\r foo</pre>',
      expected: [
        {
          msg: '<pre>foobar;</pre>',
          type: WARNING
        },
        {
          msg: '<pre>/* comment */\nvar code;</pre>',
          type: ERROR
        },
        {
          msg: '<pre>@rule param {\n  descriptor: value;\n}</pre>',
          type: ERROR
        },
        {
          msg: '<pre>&lt;tag&gt;</pre>',
          type: ERROR
        },
        {
          msg: '<pre id="foo"></pre>',
          type: WARNING
        },
        {
          msg: '<pre class="">foo</pre>',
          type: WARNING
        },
        {
          msg: '<pre> \n\n foo</pre>',
          type: WARNING
        }
      ]
    }
  ];

  runTests(assert, done, "preWithoutClass", "<pre> w/o class", url, tests);
};

require("sdk/test").run(exports);