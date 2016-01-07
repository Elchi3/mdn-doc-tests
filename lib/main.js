const data = require("sdk/self").data;
const tabs = require("sdk/tabs");
const localize = require("sdk/l10n").get;


var sidebar = require("sdk/ui/sidebar").Sidebar({
  id: 'mdn-doc-tests',
  title: 'MDN documentation tester',
  url: data.url("sidebar.html"),
  onReady: function (sbWorker) {
    sbWorker.port.on("runTests", function() {
      tabWorker = tabs.activeTab.attach({
        contentScriptFile: [data.url("doctests.js"), data.url("runtests.js")]
      });
      tabWorker.port.emit("runTests");
      tabWorker.port.on("test", function(testObj, id){
        testObj.name = localize(testObj.name);
        testObj.desc = localize(testObj.desc);
        sbWorker.port.emit("test", testObj, id);
      });
    });
  }
});

var isEditing = function(tab) {
  var editURL= /https:\/\/developer\.mozilla\.org\/.+\$edit/;
  if ((editURL.test(tab.url) && tab.url.indexOf("Template") === -1) ||
       tab.title == 'Create a New Article | MDN') {
    sidebar.show();
  } else {
    sidebar.hide();
  }
};

tabs.on('activate', function(tab) { isEditing(tab); });
tabs.on('ready', function(tab) { isEditing(tabs.activeTab); });