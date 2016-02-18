const data = require("sdk/self").data;
const tabs = require("sdk/tabs");
const localize = require("sdk/l10n").get;
const prefs = require('sdk/simple-prefs').prefs;
const { ToggleButton } = require("sdk/ui/button/toggle");
const testList = require("../data/tests/testlist").testList;
var sidebar = null;

function createSidebar(mode) {
  return require("sdk/ui/sidebar").Sidebar({
    id: 'mdn-doc-tests',
    title: localize('addon_title'),
    url: data.url("sidebar.html"),
    onReady: function (sbWorker) {
      sbWorker.port.on("runTests", function() {
        var tabWorker = createTabWorker(mode);
        tabWorker.port.emit("runTests");
        tabWorker.port.on("processTestResult", function(testObj, id) {
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
        tabWorker.port.on("badgeUpdate", function(errorCount) {
          button.state("window", {
            badge: errorCount
          });
        });
      });
    }
  });
}

function createTabWorker(mode) {
  return tabWorker = tabs.activeTab.attach({
    contentScriptFile: [
      "./doctests.js",
      ...testList.map(test => "./tests/" + test),
      "./runtests.js"
    ],
    contentScriptOptions: {
      "tabURL" : tabs.activeTab.url,
      "mode": mode
    }
  });
}

var button = ToggleButton({
  id: "mdn-doc-tests-button",
  label: localize('addon_title'),
  icon: "./icon-disabled.png",
  disabled: true,
  onClick: function (state){
    if (state.checked) {
      sidebar = createSidebar("reading-with-sidebar");
      sidebar.show();
    } else {
      sidebar.dispose();
    }
  },
});

var checkIfMdn = function(tab) {
  if (sidebar) {
    sidebar.dispose();
  }
  button.state("window", {
    disabled: true,
    checked: false,
    icon: "./icon-disabled.png",
    badge: ""
  });
  var editURL = /https:\/\/developer\.mozilla\.org\/.+(?:\$(?:edit|translate)|\/docs\/new(?:\?|$))/;
  var viewURL = /https:\/\/developer\.mozilla\.org\/([a-z]){2}(?:-[A-Z]{2})?\/.+/;
  var templateURL= /https:\/\/developer\.mozilla\.org\/.+?\/docs\/(?:templates|Template(?::|%3A))/;
  if (!templateURL.test(tab.url)) {
    if (editURL.test(tab.url)) {
      sidebar = createSidebar("editing");
      sidebar.show();
    } else if (viewURL.test(tab.url)) {
      var tabWorker = createTabWorker("reading");
      tabWorker.port.on("badgeUpdate", function(errorCount) {
        button.state("window", {
          disabled: false,
          icon: "./icon.png",
          badge: errorCount
        });
      });
    }
  }
};

tabs.on('activate', function(tab) { checkIfMdn(tab); });
tabs.on('ready', function(tab) { checkIfMdn(tabs.activeTab); });
