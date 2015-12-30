var iframe = document.querySelectorAll("iframe.cke_wysiwyg_frame")[0];
iframe.contentDocument.body.setAttribute("spellcheck", "true");
var content = iframe.contentDocument.body.innerHTML || "";

var runTest = function(testObj) {
  var contentTest = [];
  if (testObj.check) {
    contentTest = testObj.check(content);
  } else {
    contentTest = content.match(testObj.regex) || [];
  }
  testObj.count = contentTest.length;
  self.port.emit("test", testObj);
};

self.port.on("runTests", function() {
  for (var i = 0; i < docTests.length; i++) {
    runTest(docTests[i]);
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