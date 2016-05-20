let iframe = document.querySelectorAll("iframe.cke_wysiwyg_frame")[0];
let content = "";
let rootElement = null;
if (iframe) {
  iframe.contentDocument.body.setAttribute("spellcheck", "true");
  rootElement = iframe.contentDocument.body;
}

let runTest = function(testObj, id) {
  // Only run the test suite if there's a root element
  //(e.g. when in source view there's no root element set)
  if (rootElement) {
    let contentTest = testObj.check(rootElement);
    testObj.errors = contentTest;
    self.port.emit("processTestResult", testObj, id);
  }
};

self.port.on("runTests", function() {
  for (let prop in docTests) {
    runTest(docTests[prop], prop);
  }
  self.port.emit("finishedTests");
});

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