var iframe = document.querySelectorAll("iframe.cke_wysiwyg_frame")[0];
iframe.contentDocument.body.setAttribute("spellcheck", "true");
var content = iframe.contentDocument.body.innerHTML || "";

var runTest = function(testObj, id) {
  var contentTest = [];
  if (testObj.check) {
    contentTest = testObj.check(content);
  } else {
    contentTest = (content.match(testObj.regex) || [])
    contentTest = contentTest.map(match => { return {msg: match}; });
  }
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