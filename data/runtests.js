var rootElement = null;
var tabURL = self.options.tabURL;
var errorCount;

// Use CKEditor source when editing
self.port.on("editing", function() {
  var iframe = document.querySelectorAll("iframe.cke_wysiwyg_frame")[0];
  if (iframe) {
    iframe.contentDocument.body.setAttribute("spellcheck", "true");
    rootElement = iframe.contentDocument.body;
  }
  disableSaveIfNoComment();
});

// Use ?raw page source when reading
self.port.on("reading", function() {
  var xhr = new XMLHttpRequest();
  var url = tabURL.split('#')[0].split('?')[0] + "?raw";
  xhr.open("GET", url , true);
  xhr.addEventListener("load", function(event) {
    var domParser = new DOMParser();
    var doc = domParser.parseFromString(xhr.responseText, "text/html");
    rootElement = doc.body;
    errorCount = 0;
    for (var prop in docTests) {
      runTest(docTests[prop], prop);
    }
  }, false);
  xhr.send();
});

let runTest = function(testObj, id) {
  // Only run the test suite if there's a root element
  //(e.g. when in source view there's no root element set)
  if (rootElement) {
    let contentTest = testObj.check(rootElement);
    testObj.errors = contentTest;
    errorCount += testObj.errors.length;
    self.port.emit("badgeUpdate", errorCount);
    self.port.emit("processTestResult", testObj, id);
  }
};

self.port.on("runTests", function() {
  errorCount = 0;
  for (let prop in docTests) {
    runTest(docTests[prop], prop);
  }
});

// Disable save buttons if no revision comment has been entered
function disableSaveIfNoComment() {
  let btns = document.querySelectorAll(".btn-save, .btn-save-and-edit");
  let comment = document.querySelector("#page-comment #id_comment");

  let disableBtns = function(bool) {
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = bool;
    }
  };

  if (comment) {
    if (comment.value === '') {
      disableBtns(true);
    }

    comment.addEventListener("change", function() {
      disableBtns(false);
    });
  }
}