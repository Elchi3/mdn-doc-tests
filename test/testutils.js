// Utility functions that execute unit tests

const ERROR = 1;
const WARNING = 2;
const INFO = 3;

const prefs = require("sdk/simple-prefs").prefs;
const testList = require("../data/tests/testlist").testList;

exports.ERROR = ERROR;
exports.WARNING = WARNING;
exports.INFO = INFO;
exports.url = "about:blank";

function mapTestName(name) {
  return name.replace(/[A-Z]+/g, match => "-" + match.toLowerCase()) + ".js";
}

exports.runTests = function runTests(assert, done, name, desc, url, tests) {
  // Skip the test in case it is not available
  if (!testList.includes(mapTestName(name))) {
    done();
    return;
  }

  let tabs = require("sdk/tabs");
  tabs.open({
    url: url,
    onReady: tab => {
      let worker = tabs.activeTab.attach({
        contentScriptFile: [
          "./doctests.js",
          ...testList.map(test => "./tests/" + test),
          "../test/testrunner.js"],
        contentScriptOptions: {"name": name, "tests": JSON.stringify(tests),
            LONG_ARTICLE_WORD_COUNT_THRESHOLD: prefs.longArticleWordCountThreshold}
      });

      let resultCount = 0;

      worker.port.on("processTestResult", function(testObj) {
        if (testObj) {
          let matches = testObj.errors;
          let expected = testObj.expected;
          let testMessage = `${desc} - test ${testObj.index}: `;

          assert.equal(matches.length, expected.length,
              testMessage + "Number of matches must be " + expected.length);

          matches.forEach((match, i) => {
            assert.equal(match.msg, expected[i].msg,
                testMessage + "Error message for match must be correct");
  
            assert.equal(match.type, expected[i].type,
                testMessage + "Error type for match must be correct");
  
            if (expected[i].msgParams) {
              assert.deepEqual(match.msgParams, expected[i].msgParams,
                  testMessage + "Error message params for match must be correct");
            }
          });

          // Check whether the issues were fixed as expected
          if (testObj.expectedAfterFixing) {
            let matches = testObj.errorsAfterFixing;
            let expected = testObj.expectedAfterFixing;

            assert.equal(matches.length, expected.length,
                testMessage + "Number of matches after fixing must be " + expected.length);

            matches.forEach((match, i) => {
              assert.equal(match.msg, expected[i].msg,
                  testMessage + "Error message for match after fixing must be correct");

              assert.equal(match.type, expected[i].type,
                  testMessage + "Error type for match after fixing must be correct");

              if (expected[i].msgParams) {
                assert.deepEqual(match.msgParams, expected[i].msgParams,
                    testMessage + "Error message params for match after fixing must be correct");
              }
            });
          }

          resultCount++;
        }

        if (resultCount === tests.length) {
          tabs.activeTab.close();
          done();
        }
      });
    }
  });
}