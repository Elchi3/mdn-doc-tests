const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc emptyElements"] = function testEmptyElements(assert, done) {
  const tests = [
    {
      str: '<p> </p>' +
           '<p> \n\r </p>' +
           '<p> &nbsp;</p>' +
           '<p><br><br/></p>' +
           '<p><wbr><wbr/></p>' +
           '<table><tr><td>foo</td><td><br/></td></tr></table>' +
           '<img src="http://example.com/image.png">' +
           '<p><img src="http://example.com/image.png"></p>' +
           '<input value="test"/>' +
           '<p><span>some text</span></p>' +
           '<p>some text</p>' +
           '<span><span style="display:block;z-index:9999;">&nbsp;</span></span>', // Simulates new paragraph helper
      expected: [
        {
          msg: '<p> </p>',
          type: ERROR
        },
        {
          msg: '<p> \n\n </p>',
          type: ERROR
        },
        {
          msg: '<p> &nbsp;</p>',
          type: ERROR
        },
        {
          msg: '<p><br><br></p>',
          type: ERROR
        },
        {
          msg: '<p><wbr><wbr></p>',
          type: ERROR
        },
        {
          msg: '<td><br></td>',
          type: WARNING
        }
      ]
    }
  ];

  runTests(assert, done, "emptyElements", "empty elements", url, tests);
};

require("sdk/test").run(exports);