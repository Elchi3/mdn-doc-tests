const data = require("sdk/self").data;
const tabs = require("sdk/tabs");

var docTests = JSON.parse(data.load("doctests.js"));

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
      });
    });
  }
});

var isEditing = function(tab) {
  var editURL= /https:\/\/developer\.mozilla\.org\/.+\$edit/;
  if ((editURL.test(tab.url) && tab.url.indexOf("Template:") === -1) ||
       tab.title == 'Create a New Article | MDN') {
    sidebar.show();
  } else {
    sidebar.hide();
  }
};

tabs.on('activate', function(tab) { isEditing(tab) });
tabs.on('load', function(tab) { isEditing(tab) });