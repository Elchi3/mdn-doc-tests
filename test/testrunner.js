// This test runner is called from unit tests only

let testObj = docTests[self.options.name];
let rootElement = document.createElement("div");
let tests = JSON.parse(self.options.tests);

tests.forEach(test => {
  rootElement.innerHTML = test.str;
  if (testObj) {
    let matches = testObj.check(rootElement);
    testObj.errors = matches;
    testObj.expected = test.expected;
  }
  self.port.emit("processTestResult", testObj, self.options.name);
});