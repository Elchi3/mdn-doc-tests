const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc wrongHighlightedLine"] = function testWrongHighlightedLines(assert, done) {
  const tests = [
    {
      str: '<pre class="brush: js; highlight[2];">foo\nbar</pre>' +
           '<pre class="brush:js;">foo\nbar</pre>' +
           '<pre class="highlight[1]; brush:js;">foo\nbar</pre>' +
           '<pre class="brush: js; highlight[1,3];">foo\nbar\nbaz</pre>' +
           '<pre class="brush: js; highlight[1-3];">foo\nbar\nbaz</pre>' +
           '<pre class="brush: js; highlight[1-3,5];">foo\nbar\nbaz\nbax\nbix</pre>' +
           '<pre class="brush: js; highlight[ 1, 3 - 5 ,2 ];">foo\nbar\nbaz\nbax\nbix</pre>' +
           '<pre class="brush: js; highlight[0];">foo\nbar</pre>' +
           '<pre class="brush: js; highlight[-1];">foo\nbar</pre>' +
           '<pre class="brush: js; highlight[3];">foo\nbar</pre>' +
           '<pre class="brush: js; highlight[3];">foo<br>bar</pre>' +
           '<pre class="brush: js; highlight[3];">foo<br/>bar</pre>' +
           '<pre class="brush: js; highlight:[3];">foo<br>bar</pre>' +
           '<pre class="brush: js; highlight[1,-3--5,3];">foo\nbar\nbaz</pre>' +
           '<pre class="brush: js; highlight [ 1, 3 - 6 ,2 ];">foo\nbar\nbaz</pre>',
      expected: [
        {
          msg: "highlighted_line_number_not_positive",
          msgParams: ["0", "0"],
          type: ERROR
        },
        {
          msg: "highlighted_line_number_not_positive",
          msgParams: ["-1", "-1"],
          type: ERROR
        },
        {
          msg: "highlighted_line_number_too_big",
          msgParams: ["3", "2", "3"],
          type: ERROR
        },
        {
          msg: "highlighted_line_number_too_big",
          msgParams: ["3", "2", "3"],
          type: ERROR
        },
        {
          msg: "highlighted_line_number_too_big",
          msgParams: ["3", "2", "3"],
          type: ERROR
        },
        {
          msg: "highlighted_line_number_too_big",
          msgParams: ["3", "2", "3"],
          type: ERROR
        },
        {
          msg: "highlighted_line_number_not_positive",
          msgParams: ["-3", "1,-3--5,3"],
          type: ERROR
        },
        {
          msg: "highlighted_line_number_not_positive",
          msgParams: ["-5", "1,-3--5,3"],
          type: ERROR
        },
        {
          msg: "invalid_highlighted_range",
          msgParams: ["-3", "-5", "1,-3--5,3"],
          type: ERROR
        },
        {
          msg: "highlighted_line_number_too_big",
          msgParams: ["6", "3", " 1, 3 - 6 ,2 "],
          type: ERROR
        }
      ],
      expectedAfterFixing: []
    }
  ];

  runTests(assert, done, "wrongHighlightedLine", "Wrong highlighted line", url, tests);
};

require("sdk/test").run(exports);