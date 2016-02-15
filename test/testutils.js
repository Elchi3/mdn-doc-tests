// Utility functions that execute unit tests

const testList = require("../data/tests/testlist").testList;

exports.url = "about:blank";

exports.runTests = function runTests(assert, done, name, desc, url, tests) {
  var tabs = require("sdk/tabs");
  tabs.open({
    url: url,
    onReady: tab => {
      var worker = tabs.activeTab.attach({
        contentScriptFile: [
          "./doctests.js",
          ...testList.map(test => "./tests/" + test),
          "../test/testrunner.js"],
        contentScriptOptions: {"name": name, "tests": JSON.stringify(tests)}
      });

      var resultCount = 0;

      worker.port.on("testResult", function(testObj) {
        var matches = testObj.errors;
        var expected = testObj.expected;

        assert.equal(matches.length, expected.length,
                     "Number of " + desc + " matches must be " + expected.length);

        matches.forEach((match, i) => {
          var expectedIsObject = typeof expected[i] === "object";
          var expectedValue = expectedIsObject ? expected[i].msg : expected[i];

          assert.equal(match.msg, expectedValue,
                       "Error message for " + desc + " match must be correct");

          if (expectedIsObject) {
            assert.deepEqual(match.msgParams, expected[i].msgParams,
                             "Error message params for " + desc + " match must be correct");
          }
        });

        resultCount++;
        if (resultCount === tests.length) {
          tabs.activeTab.close();
          done();
        }
      });
    }
  });
}