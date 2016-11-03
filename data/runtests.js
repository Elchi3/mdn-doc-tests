const RUN_TESTS_DELAY = 500;

let runTestsTimeout = null;

window.setTimeout(initializeKeyEventHandler, 1000);

function initializeKeyEventHandler() {
  let iframe = document.querySelector("iframe.cke_wysiwyg_frame");
  iframe.contentWindow.addEventListener("keyup", runTestsAfterTimeout);
  iframe.contentWindow.addEventListener("keydown", resetRunTestsTimeout);
  
  function runTestsAfterTimeout() {
    runTestsTimeout = window.setTimeout(runTests, RUN_TESTS_DELAY);
  }
  
  function resetRunTestsTimeout() {
    window.clearTimeout(runTestsTimeout);
  }
  
  let ckeditor = document.getElementById("id_content");
  ckeditor.addEventListener("keyup", runTestsAfterTimeout);
  ckeditor.addEventListener("keydown", resetRunTestsTimeout);
}

function runTest(testObj, id, rootElement) {
  // Only run the test suite if there's a root element
  // (e.g. when in source view there's no root element set)
  if (rootElement) {
    let contentTest = testObj.check(rootElement);
    testObj.errors = contentTest;
    self.port.emit("processTestResult", testObj, id);
  }
};

let fixIssues = function(testObj, id) {
  // Only run the fixes if there's a root element
  // (e.g. when in source view there's no root element set)
  if (testObj.fix) {
    testObj.fix(testObj.errors);

    // Run test again to update its results
    let iframe = document.querySelector("iframe.cke_wysiwyg_frame");
    let rootElement = iframe.contentDocument.body;
    runTest(testObj, id, rootElement);
  }
};

function runTests() {
  let iframe = document.querySelector("iframe.cke_wysiwyg_frame");
  if (iframe) {
    let rootElement = iframe.contentDocument.body;

    for (let prop in docTests) {
      runTest(docTests[prop], prop, rootElement);
    }
  }
  self.port.emit("finishedTests");
}

self.port.on("runTests", function() {
  runTests();
});

self.port.on("fixIssues", function() {
  for (let prop in docTests) {
    fixIssues(docTests[prop], prop);
  }
});

window.addEventListener("load", function injectIFrame() {
  window.removeEventListener("load", injectIFrame);

  // Using polling to add the spellchecking and initially run the tests,
  // because the iframe is not loaded immediately and there doesn't seem
  // to be a proper event to react to.
  let checkIfIframeLoadedInterval = setInterval(() => {
    let iframe = document.querySelector("iframe.cke_wysiwyg_frame");
    if (iframe) {
      clearInterval(checkIfIframeLoadedInterval);
      iframe.contentDocument.body.setAttribute("spellcheck", "true");
      runTests();
    }
  }, 50);
});
