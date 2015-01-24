var iframe = document.querySelectorAll("iframe.cke_wysiwyg_frame")[0];
iframe.contentDocument.body.setAttribute("spellcheck", "true");
var content = iframe.contentDocument.body.innerHTML || "";

var runTest = function(testObj) {
  var contentTest = content.match(new RegExp(testObj.regex, 'gi')) || [];
  testObj.count = contentTest.length;
  self.port.emit("test", testObj);
};

self.port.on("runTests", function(docTests) {
  for (var i = 0; i <= docTests.length; i++) {
    runTest(docTests[i]);
  }
});
