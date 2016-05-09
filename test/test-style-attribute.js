const {url, runTests} = require("./testutils");

exports["test doc styleAttribute"] = function testStyleAttributes(assert, done) {
  const tests = [
    {
      str: '<span style=""></span>' +
           '<div style="margin-top:5%"></div>' +
           '<section style="background:#fff; color: rgb(234, 234, 234);"></section>' +
           '<b style=\'padding: 5px !important\'>test</b>' +
           '<span style="font-family: \'Open Sans\', serif; line-height: 1.5"></span>' +
           '<span><span style="display:block;z-index:9999;">&nbsp;</span></span>', // Simulates new paragraph helper
      expected: [
        'style=""',
        'style="margin-top:5%"',
        'style="background:#fff; color: rgb(234, 234, 234);"',
        'style="padding: 5px !important"',
        'style="font-family: \'Open Sans\', serif; line-height: 1.5"'
      ]
    }
  ];

  runTests(assert, done, "styleAttribute", "'style' attribute", url, tests);
};

require("sdk/test").run(exports);