const data = require("sdk/self").data;
const tabs = require("sdk/tabs");
const localize = require("sdk/l10n").get;
const prefs = require('sdk/simple-prefs').prefs;
const testList = require("../data/tests/testlist").testList;

var sidebar = require("sdk/ui/sidebar").Sidebar({
  id: 'mdn-doc-tests',
  title: 'MDN documentation tester',
  url: data.url("sidebar.html"),
  onReady: function (sbWorker) {
    sbWorker.port.on("runTests", function() {
      tabWorker = tabs.activeTab.attach({
        contentScriptFile: [
          "./doctests.js",
          ...testList.map(test => "./tests/" + test),
          "./runtests.js"
        ]
      });
      tabWorker.port.emit("runTests");
      tabWorker.port.on("processTestResult", function(testObj, id){
        testObj.name = localize(testObj.name);
        testObj.desc = localize(testObj.desc);
        testObj.errors.forEach((error, i, errors) => {
          errors[i] = {
            msg: localize.apply(this, [error.msg].concat(error.msgParams)),
            type: error.type
          };
        })
        sbWorker.port.emit("showTestResult", testObj, id, prefs);
      });
    });
  }
});

var isEditing = function(tab) {
  var editURL= /https:\/\/developer\.mozilla\.org\/.+(?:\$(?:edit|translate)|\/docs\/new(?:\?|$))/;
  var templateURL= /https:\/\/developer\.mozilla\.org\/.+?\/docs\/(?:templates|Template(?::|%3A))/;
  if (editURL.test(tab.url) && !templateURL.test(tab.url)) {
    sidebar.show();
  } else {
    sidebar.hide();
  }
};

tabs.on('activate', function(tab) { isEditing(tab); });
tabs.on('ready', function(tab) { isEditing(tabs.activeTab); });
