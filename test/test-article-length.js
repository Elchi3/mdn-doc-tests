const {ERROR, WARNING, INFO, url, runTests} = require("./testutils");

exports["test doc articleLength"] = function testArticleLength(assert, done) {
  const tests = [
    {
      str: Array(100).fill("foo").join(" "),
      expected: [
        {
          msg: "article_length_info",
          msgParams: ["100", "< 1"],
          type: INFO
        }
      ]
    },
    {
      str: Array(500).fill("foo").join(" "),
      expected: [
        {
          msg: "article_length_info",
          msgParams: ["500", "2"],
          type: INFO
        }
      ]
    },
    {
      str: Array(3000).fill("foo").join(" "),
      expected: [
        {
          msg: "article_length_info",
          msgParams: ["3000", "11"],
          type: INFO
        },
        {
          msg: "long_article",
          type: WARNING
        }
      ]
    }
  ];

  runTests(assert, done, "articleLength", "article length", url, tests);
};

require("sdk/test").run(exports);