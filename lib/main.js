const data = require("sdk/self").data;
const tabs = require("sdk/tabs");
const localize = require("sdk/l10n").get;
const prefs = require('sdk/simple-prefs').prefs;
const { ToggleButton } = require("sdk/ui/button/toggle");
const testList = require("../data/tests/testlist").testList;
var sidebarWorker = null;
var tabWorker = null;
var mode = "reading";

var button = ToggleButton({
  id: "mdn-doc-tests-button",
  label: localize('addon_title'),
  icon: "./icon-disabled.png",
  disabled: true,
  checked: false,
  onChange: function() {
    this.state("window", null);
    let {badge, checked} = this.state('tab');
    this.state("tab", {
      checked: !checked,
      badge: badge,
      disabled: false,
      icon: "./icon.png"
    });
    if (checked) {
      sidebar.hide().catch(() => {});
    } else {
      sidebar.show();
    }
  }
});

var sidebar = require("sdk/ui/sidebar").Sidebar({
  id: 'mdn-doc-tests',
  title: localize('addon_title'),
  url: data.url("sidebar.html"),
  onReady: function (sbWorker) {
    sidebarWorker = sbWorker;
    if (mode === "editing") {
      tabWorker.port.emit("editing");
    }
    tabWorker.port.emit("runTests");
    sbWorker.port.on("runTests", function() {
      tabWorker.port.emit("runTests");
    });
  },
  onHide: function() {
    let {badge, icon, disabled} = button.state('tab');
    button.state("tab", {
      checked: false,
      badge: badge,
      disabled: disabled,
      icon: icon
    });
  },
  onShow: function() {
    let {badge, icon, disabled} = button.state('tab');
    button.state("tab", {
      checked: true,
      badge: badge,
      disabled: disabled,
      icon: icon
    });
  }
});

function attachTabWorker() {
  tabWorker = tabs.activeTab.attach({
    contentScriptFile: [
      "./doctests.js",
      ...testList.map(test => "./tests/" + test),
      "./runtests.js"
    ],
    contentScriptOptions: {
      "tabURL" : tabs.activeTab.url
    }
  });

  tabWorker.port.on("badgeUpdate", function(errorCount) {
    let {icon, checked, disabled} = button.state('tab');
    button.state("tab", {
      badge: errorCount,
      checked: checked,
      disabled: disabled,
      icon: icon
    });
  });

  tabWorker.port.on("processTestResult", function(testObj, id) {
    testObj.name = localize(testObj.name);
    testObj.desc = localize(testObj.desc);
    testObj.errors.forEach((error, i, errors) => {
      errors[i] = {
        msg: localize.apply(this, [error.msg].concat(error.msgParams)),
        type: error.type
      };
    });
    sidebarWorker.port.emit("showTestResult", testObj, id, prefs);
  });
}

var checkIfMdn = function(tab) {
  // always hide sidebar, catch error if already hidden
  sidebar.hide().catch(() => {});

  var editURL = /(?:\$(?:edit|translate)|\/docs\/new(?:\?|$))/;
  var viewURL = /(?:docs|Add-ons|Tools|Apps|Marketplace|Firefox_OS|Firefox|Learn|Persona)/;
  var exclude = /\$|docs\/(?:templates|Template(?::|%3A)|all|with-errors|needs-review|top-level|without-parent|tag|files|localization-tag)/;


  if ((tab.url.indexOf("developer.mozilla.org") !== -1 ||
      tab.url.indexOf("developer.allizom.org") !== -1) &&
      viewURL.test(tab.url) &&
      (!exclude.test(tab.url) || editURL.test(tab.url))) {

    attachTabWorker();

    if (editURL.test(tab.url)) {
      mode = "editing";
      sidebar.show();
      button.state("tab", {
        disabled: false,
        checked: true,
        icon: "./icon.png",
        badge: ""
      });
    } else if (viewURL.test(tab.url)) {
      mode = "reading";
      button.state("tab", {
        disabled: false,
        checked: false,
        icon: "./icon.png"
      });
      tabWorker.port.emit("reading");
    }

  } else {
    button.state("tab", {
      disabled: true,
      checked: false,
      icon: "./icon-disabled.png",
      badge: ""
    });
  }
};

tabs.on('activate', function(tab) { checkIfMdn(tab); });
tabs.on('ready', function(tab) { checkIfMdn(tabs.activeTab); });
