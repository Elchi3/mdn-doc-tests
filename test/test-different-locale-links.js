const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc differentLocaleLinks"] = function testDifferentLocaleLinks(assert, done) {
  const tests = [
    {
      str: '<a href="/en-US/docs/some/page">Page</a>' +
           '<a href="http://developer.mozilla.org/en-US/docs/some/page">Page</a>' +
           '<a href="https://developer.mozilla.org/en-US/docs/some/page">Page</a>' +
           '<a href="/@api/deki/files/1234567/somefile.png">Page</a>' +
           '<a href="/xx-YY/docs/some/page">Page</a>' +
           '<a href="http://developer.mozilla.org/xx-YY/docs/some/page">Page</a>' +
           '<a href="https://developer.mozilla.org/xx-YY/docs/some/page">Page</a>',
      expected: [
        {
          msg: "link_using_wrong_locale",
          msgParams: ["/xx-YY/docs/some/page", "en-US"],
          type: ERROR
        },
        {
          msg: "link_using_wrong_locale",
          msgParams: ["http://developer.mozilla.org/xx-YY/docs/some/page", "en-US"],
          type: ERROR
        },
        {
          msg: "link_using_wrong_locale",
          msgParams: ["https://developer.mozilla.org/xx-YY/docs/some/page", "en-US"],
          type: ERROR
        }
      ]
    }
  ];

  runTests(assert, done, "differentLocaleLinks", "different locale links", url, tests);
};

require("sdk/test").run(exports);