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
      if (mode.indexOf("reading") === -1) {
        button.state("tab", {
          badge: ""
        });
      }
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
          button.state("tab", {
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

  var editURL = /(?:\$(?:edit|translate)|\/docs\/new(?:\?|$))/;
  var viewURL = /(?:docs|Add-ons|Tools|Apps|Marketplace|Firefox_OS|Firefox|Learn|Persona)/;
  var exclude = /\$|docs\/(?:templates|Template(?::|%3A)|all|with-errors|needs-review|top-level|without-parent|tag|files|localization-tag)/;

  if ((tab.url.indexOf("developer.mozilla.org") !== -1 ||
      tab.url.indexOf("developer.allizom.org") !== -1) &&
      viewURL.test(tab.url) &&
      (!exclude.test(tab.url) || editURL.test(tab.url))) {

    if (editURL.test(tab.url)) {
      button.state("window", {
        disabled: false,
        icon: "./icon.png",
        checked: true,
        badge: ""
      });
      sidebar = createSidebar("editing");
      sidebar.show();
    } else if (viewURL.test(tab.url)) {
      button.state("window", {
        disabled: false,
        icon: "./icon.png"
      });
      var tabWorker = createTabWorker("reading");
      tabWorker.port.on("badgeUpdate", function(errorCount) {
        button.state("window", {
          disabled: false,
          icon: "./icon.png",
          badge: errorCount
        });
      });
    }

  } else {
    button.state("window", {
      disabled: true,
      checked: false,
      icon: "./icon-disabled.png",
      badge: ""
    });
  }
};

tabs.on('activate', function(tab) { checkIfMdn(tab); });
tabs.on('ready', function(tab) { checkIfMdn(tabs.activeTab); });
