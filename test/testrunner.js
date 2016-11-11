// This test runner is called from unit tests only

let testObj = docTests[self.options.name];
let rootElement = document.createElement("div");
let tests = JSON.parse(self.options.tests);

tests.forEach((test, i) => {
  rootElement.innerHTML = test.str;
  if (testObj) {
    testObj.index = i + 1;
    testObj.expected = test.expected;

    let matches = testObj.check(rootElement);
    testObj.errors = matches;

    if (test.expectedAfterFixing) {
      testObj.fix(matches);
      let matchesAfterFixing = testObj.check(rootElement);
      testObj.errorsAfterFixing = matchesAfterFixing;
      testObj.expectedAfterFixing = test.expectedAfterFixing;
    }
  }

  self.port.emit("processTestResult", testObj, self.options.name);
});