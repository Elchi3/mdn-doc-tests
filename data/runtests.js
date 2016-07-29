function runTest(testObj, id, rootElement) {
  // Only run the test suite if there's a root element
  //(e.g. when in source view there's no root element set)
  if (rootElement) {
    let contentTest = testObj.check(rootElement);
    testObj.errors = contentTest;
    self.port.emit("processTestResult", testObj, id);
  }
};

self.port.on("runTests", function() {
  let iframe = document.querySelector("iframe.cke_wysiwyg_frame");
  if (iframe) {
    rootElement = iframe.contentDocument.body;

    for (let prop in docTests) {
      runTest(docTests[prop], prop, rootElement);
    }
  }
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

window.addEventListener("load", function injectIFrame() {
  window.removeEventListener("load", injectIFrame);

  // Using a timeout to add the spellchecking, because the iframe is not loaded immediately and
  // there doesn't seem to be a proper event to react to.
  setTimeout(() => {
    let iframe = document.querySelector("iframe.cke_wysiwyg_frame");
    if (iframe) {
      iframe.contentDocument.body.setAttribute("spellcheck", "true");
    }
  }, 1000);
});
