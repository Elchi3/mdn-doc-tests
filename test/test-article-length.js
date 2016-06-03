const {url, runTests} = require("./testutils");

exports["test doc articleLength"] = function testArticleLength(assert, done) {
  const tests = [
    {
      str: Array(100).fill("foo").join(" "),
      expected: [
        {
          msg: "article_length_info",
          msgParams: ["100", "< 1"]
        }
      ]
    },
    {
      str: Array(500).fill("foo").join(" "),
      expected: [
        {
          msg: "article_length_info",
          msgParams: ["500", "2"]
        }
      ]
    },
    {
      str: Array(3000).fill("foo").join(" "),
      expected: [
        {
          msg: "article_length_info",
          msgParams: ["3000", "11"]
        },
        {
          msg: "long_article"
        }
      ]
    }
  ];

  runTests(assert, done, "articleLength", "article length", url, tests);
};

require("sdk/test").run(exports);