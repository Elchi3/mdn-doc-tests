const data = require("sdk/self").data;
const tabs = require("sdk/tabs");

var docTests = JSON.parse(data.load("doctests.js"))

var sidebar = require("sdk/ui/sidebar").Sidebar({
  id: 'mdn-doc-tests',
  title: 'MDN documentation tester',
  url: data.url("sidebar.html"),
  onReady: function (sbWorker) {
    sbWorker.port.on("runTests", function() {
      tabWorker = tabs.activeTab.attach({
        contentScriptFile: data.url("runtests.js")
      });
      tabWorker.port.emit("runTests", docTests);
      tabWorker.port.on("test", function(testObj){
        sbWorker.port.emit("test", testObj);
    })
    })
  }
});

sidebar.show();
