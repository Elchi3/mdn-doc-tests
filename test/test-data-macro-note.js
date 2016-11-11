const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc dataMacroNote"] = function testDataMacroNote(assert, done) {
  const tests = [
    {
      str: '<p>{{nondatamacro}}</p>' +
           '<p class="hidden">The data is maintained at <a href="https://domain/path/to/data"></a></p><p>{{compat}}</p>' +
           '<p class="hidden">The data is maintained at <a href="https://domain/path/to/data"></a></p><p>{{css_ref}}</p>' +
           '<p class="hidden">The data is maintained at <a href="https://domain/path/to/data"></a></p><p>{{cssanimatedproperties}}</p>' +
           '<p class="hidden">The data is maintained at <a href="https://domain/path/to/data"></a></p><p>{{cssinfo}}</p>' +
           '<p class="hidden">The data is maintained at <a href="https://domain/path/to/data"></a></p><p>{{csssyntax}}</p>' +
           '<p class="hidden">The data is maintained at <a href="https://domain/path/to/data"></a></p><p>{{WebExtBrowserCompat}}</p>' +
           '<p>{{Compat}}</p>' +
           '<p class="hidden">The data is maintained somewhere else.</p><p>{{Compat}}</p>',
      expected: [
        {
          msg: "data_macro_note_missing",
          msgParams: ["{{Compat}}"],
          type: ERROR
        },
        {
          msg: "data_macro_source_link_missing",
          msgParams: ["{{Compat}}"],
          type: ERROR
        }
      ]
    }
  ];

  runTests(assert, done, "dataMacroNote", "Data macro note", url, tests);
};

require("sdk/test").run(exports);