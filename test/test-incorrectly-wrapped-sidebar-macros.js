const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc incorrectlyWrappedSidebarMacros"] = function testIncorrectlyWrappedSidebarMacros(assert, done) {
  const tests = [
    {
      str: '<div>{{CSSRef}}</div>',
      expected: []
    },
    {
      str: '<div>{{HTMLRef}}</div>',
      expected: []
    },
    {
      str: '<div>{{APIRef}}</div>',
      expected: []
    },
    {
      str: '<div>{{JSRef}}</div>',
      expected: []
    },
    {
      str: '<div>{{SVGRefElem}}</div>',
      expected: []
    },
    {
      str: '<div>{{JSSidebar}}</div>',
      expected: []
    },
    {
      str: '<div>{{AddonSidebar}}</div>',
      expected: []
    },
    {
      str: '<div>{{ APIRef("Some API") }}</div>',
      expected: []
    },
    {
      str: '<p>{{CSSRef}}</p>',
      expected: [
        {
          msg: "wrong_element_wrapping_sidebar_macro",
          msgParams: ["{{CSSRef}}", "p"],
          type: ERROR
        }
      ]
    },
    {
      str: '<span>{{ APIRef("Some API") }}</span>',
      expected: [
        {
          msg: "wrong_element_wrapping_sidebar_macro",
          msgParams: ["{{ APIRef(\"Some API\") }}", "span"],
          type: ERROR
        }
      ]
    }
  ];

  runTests(assert, done, "incorrectlyWrappedSidebarMacros", "incorrectly wrapped sidebar macros",
      url, tests);
};

require("sdk/test").run(exports);