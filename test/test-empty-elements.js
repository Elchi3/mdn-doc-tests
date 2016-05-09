const {url, runTests} = require("./testutils");

exports["test doc emptyElements"] = function testEmptyElements(assert, done) {
  const tests = [
    {
      str: '<p> </p>' +
           '<p> \n\r </p>' +
           '<p> &nbsp;</p>' +
           '<p><br><br/></p>' +
           '<img src="http://example.com/image.png">' +
           '<input value="test"/>' +
           '<p><span>some text</span></p>' +
           '<p>some text</p>' +
           '<span><span style="display:block;z-index:9999;">&nbsp;</span></span>', // Simulates new paragraph helper
      expected: [
        '<p> </p>',
        '<p> \n\n </p>',
        '<p> &nbsp;</p>',
        '<p><br><br></p>'
      ]
    }
  ];

  runTests(assert, done, "emptyElements", "empty elements", url, tests);
};

require("sdk/test").run(exports);