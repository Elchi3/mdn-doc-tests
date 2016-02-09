// This test runner is called from unit tests only

var testObj = docTests[self.options.name];
var rootElement = document.createElement('div');
var tests = JSON.parse(self.options.tests);

tests.forEach(test => {
  rootElement.innerHTML = test.str;
  var matches = testObj.check(rootElement);
  testObj.errors = matches;
  testObj.expected = test.expected;
  self.port.emit('testResult', testObj, self.options.name);
});