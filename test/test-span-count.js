const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc spanCount"] = function testSpanElements(assert, done) {
  const tests = [
    {
      str: '<span>what?</span>' +
           '<p>nope</p>' +
           '<span class="foo" style="font:10px">bar</span>' +
           '<span><dt>foobar</dt></span>' +
           '<span class="seoSummary">seoseoseo</span>' +
           '<span><span style="display:block;z-index:9999;">&nbsp;</span></span>', // Simulates new paragraph helper
      expected: [
        {
          msg: '<span>what?</span>',
          type: ERROR
        },
        {
          msg: '<span class="foo" style="font:10px">bar</span>',
          type: ERROR
        },
        {
          msg: '<span><dt>foobar</dt></span>',
          type: ERROR
        }
      ],
      expectedAfterFixing: [
        {
          msg: '<span class="foo" style="font:10px">bar</span>',
          type: ERROR
        }
      ]
    }
  ];

  runTests(assert, done, "spanCount", "<span> elements", url, tests);
};

require("sdk/test").run(exports);