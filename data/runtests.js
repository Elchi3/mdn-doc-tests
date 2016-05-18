var iframe = document.querySelectorAll("iframe.cke_wysiwyg_frame")[0];
var content = "";
var rootElement = null;
if (iframe) {
  iframe.contentDocument.body.setAttribute("spellcheck", "true");
  rootElement = iframe.contentDocument.body;
}

var runTest = function(testObj, id) {
  // Only run the test suite if there's a root element
  //(e.g. when in source view there's no root element set)
  if (rootElement) {
    var contentTest = testObj.check(rootElement);
    testObj.errors = contentTest;
    self.port.emit("processTestResult", testObj, id);
  }
};

self.port.on("runTests", function() {
  for (var prop in docTests) {
    runTest(docTests[prop], prop);
  }
});

var btns = document.querySelectorAll(".btn-save, .btn-save-and-edit");
var comment = document.querySelectorAll("#page-comment #id_comment")[0];


var disableBtns = function(bool) {
  for (var i = 0; i < btns.length; i++) {
    btns[i].disabled = bool;
  }
};

if (comment.value === '') {
  disableBtns(true);
}

comment.addEventListener("change", function() {
  disableBtns(false);
});