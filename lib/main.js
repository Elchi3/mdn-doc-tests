const data = require("sdk/self").data;
const tabs = require("sdk/tabs");
const localize = require("sdk/l10n").get;
const prefs = require("sdk/simple-prefs").prefs;
const testList = require("../data/tests/testlist").testList;
const editURL= /^https:\/\/developer\.mozilla\.org\/.+(?:\$(?:edit|translate)|\/docs\/new(?:\?|$))/;
const templateURL= /^https:\/\/developer\.mozilla\.org\/.+?\/docs\/(?:templates|Template(?::|%3A))/;

let tabWorkers = new WeakMap();
let sidebarWorker = null;

let sidebar = require("sdk/ui/sidebar").Sidebar({
  id: "mdn-doc-tests",
  title: "MDN documentation tester",
  url: data.url("sidebar.html"),
  onReady: function (sbWorker) {
    sidebarWorker = sbWorker;

    let tabWorker = tabWorkers.get(tabs.activeTab);
    tabWorker.port.emit("runTests");

    sidebarWorker.port.on("runTests", function() {
      tabWorker.port.emit("runTests");
      tabWorker.port.on("finishedTests", () => sidebarWorker.port.emit("hideProgressBar"));
    });
  }
});

function initializeTestingEnvironment(tab, overwriteWorker) {
  if (editURL.test(tab.url) && !templateURL.test(tab.url)) {
    if (!tabWorkers.has(tab) || overwriteWorker) {
      let tabWorker = tab.attach({
        contentScriptFile: [
          "./doctests.js",
          ...testList.map(test => "./tests/" + test),
          "./runtests.js"
        ],
        contentScriptOptions: {
          LONG_ARTICLE_WORD_COUNT_THRESHOLD: prefs.longArticleWordCountThreshold
        }
      });
      tabWorker.port.on("processTestResult", function(testObj, id){
        testObj.name = localize(testObj.name);
        testObj.desc = localize(testObj.desc);
        testObj.errors.forEach((error, i, errors) => {
          errors[i] = {
            msg: localize.apply(this, [error.msg].concat(error.msgParams)),
            type: error.type
          };
        });

        if (sidebarWorker) {
          sidebarWorker.port.emit("showTestResult", testObj, id, prefs);
          sidebarWorker.port.emit("updateProgress", Math.round(100 / testList.length));
        }
      });

      tabWorkers.set(tab, tabWorker);
    }
  }
  toggleSidebar();
};

function destroyTestingEnvironment(tab) {
  tabWorkers.remove(tab);
};

function handleTabSwitch() {
  toggleSidebar();
  let tabWorker = tabWorkers.get(tabs.activeTab) || initializeTestingEnvironment(tabs.activeTab, true);
  if (tabWorker) {
    tabWorker.port.emit("runTests");
  }
}

function toggleSidebar() {
  if (editURL.test(tabs.activeTab.url) && !templateURL.test(tabs.activeTab.url)) {
    sidebar.show();
  } else {
    sidebar.hide();
  }
};

tabs.on("activate", handleTabSwitch);
tabs.on("ready", initializeTestingEnvironment);
tabs.on("pagehide", destroyTestingEnvironment);
tabs.on("pageshow", initializeTestingEnvironment);
