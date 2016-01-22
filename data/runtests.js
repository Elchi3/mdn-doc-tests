var iframe = document.querySelectorAll("iframe.cke_wysiwyg_frame")[0];
var content = "";
if (iframe) {
  iframe.contentDocument.body.setAttribute("spellcheck", "true");
  content = iframe.contentDocument.body.innerHTML || "";
}

var runTest = function(testObj, id) {
  // If there's no content (e.g. happens when in source view),
  // don't run the test suite
  if (content === "") {
    return;
  }

  var contentTest = testObj.check(content);
  testObj.errors = contentTest;
  self.port.emit("test", testObj, id);
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