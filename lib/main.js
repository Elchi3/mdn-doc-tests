const data = require("sdk/self").data;
const tabs = require("sdk/tabs");
const localize = require("sdk/l10n").get;
const prefs = require("sdk/simple-prefs").prefs;
const testList = require("../data/tests/testlist").testList;
const editURL= /https:\/\/developer\.mozilla\.org\/.+(?:\$(?:edit|translate)|\/docs\/new(?:\?|$))/;
const templateURL= /https:\/\/developer\.mozilla\.org\/.+?\/docs\/(?:templates|Template(?::|%3A))/;

let tabWorkers = new WeakMap();

let sidebar = require("sdk/ui/sidebar").Sidebar({
  id: "mdn-doc-tests",
  title: "MDN documentation tester",
  url: data.url("sidebar.html"),
  onReady: function (sbWorker) {
    sbWorker.port.on("runTests", function() {
      let tabWorker = tabWorkers.get(tabs.activeTab);
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
        sbWorker.port.emit("updateProgress", 100 / testList.length);
      });
      tabWorker.port.on("finishedTests", () => sbWorker.port.emit("hideProgressBar"));
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
      tabWorkers.set(tab, tabWorker);
    }
  }
  toggleSidebar();
};

function destroyTestingEnvironment(tab) {
  tabWorkers.remove(tab);
};

function toggleSidebar() {
  if (editURL.test(tabs.activeTab.url) && !templateURL.test(tabs.activeTab.url)) {
    sidebar.show();
  } else {
    sidebar.hide();
  }
};

tabs.on("activate", toggleSidebar);
tabs.on("ready", initializeTestingEnvironment);
tabs.on("pagehide", destroyTestingEnvironment);
tabs.on("pageshow", initializeTestingEnvironment);
