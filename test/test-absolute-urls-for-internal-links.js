const {url, runTests} = require("./testutils");

exports["test doc absoluteURLsForInternalLinks"] = function testAbsoluteURLsForInternalLinks(assert, done) {
  const tests = [
    {
      str: '<a href="/en-US/docs/some/page">Page</a>' +
           '<a href="#anchor">Anchor</a>' +
           '<a href="https://developer.mozilla.org/en-US/docs/some/page">Anchor</a>' +
           '<a href="http://developer.mozilla.org/en-US/docs/some/page">Anchor</a>' +
           '<a href="//developer.mozilla.org/en-US/docs/some/page">Anchor</a>',
      expected: [
        '<a href="https://developer.mozilla.org/en-US/docs/some/page">Anchor</a>',
        '<a href="http://developer.mozilla.org/en-US/docs/some/page">Anchor</a>',
        '<a href="//developer.mozilla.org/en-US/docs/some/page">Anchor</a>'
      ]
    }
  ];

  runTests(assert, done, "absoluteURLsForInternalLinks", "absolute URLs for internal links", url, tests);
};

require("sdk/test").run(exports);