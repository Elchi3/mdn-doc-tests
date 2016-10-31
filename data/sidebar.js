const ERROR = 1;
const WARNING = 2;
const INFO = 3;

let totalErrorCount = 0;
let totalWarningCount = 0;

addon.port.on("showTestResult", function(test, id, prefs) {
  let tests = document.getElementById("tests");
  let matchesCount = test.errors.length;
  let status = "ok";
  if (matchesCount !== 0) {
    if (test.errors.some(match => match.type === ERROR)) {
      status = "hasErrors";
    } else if (test.errors.some(match => match.type === WARNING)) {
      status = "hasWarnings";
    } else if (test.errors.every(match => match.type === INFO)) {
      status = "hasInfo";
    }
  }
  let oldWarningCount = 0;
  let oldErrorCount = 0;
  let newWarningCount = test.errors.filter(match => match.type === WARNING).length;
  let newErrorCount = test.errors.filter(match => match.type === ERROR).length;

  tests.classList.toggle("hidePassingTests", prefs.hidePassingTests);

  let testElem = document.getElementById(id);
  if (tests.contains(testElem)) {
    oldWarningCount = Number(testElem.dataset.warningCount);
    oldErrorCount = Number(testElem.dataset.errorCount);
    testElem.dataset.errorCount = newErrorCount;
    testElem.dataset.warningCount = newWarningCount;
    testElem.getElementsByClassName("errorCount")[0].textContent = matchesCount;
    testElem.classList.remove("hasErrors", "hasWarnings", "hasInfo", "ok");
    testElem.classList.add(status);
  } else {
    let testContainer = document.createElement("li");
    testContainer.setAttribute("class", "test " + status);
    testContainer.setAttribute("id", id);
    testContainer.setAttribute("title", test.desc);
    testContainer.dataset.errorCount = newErrorCount;
    testContainer.dataset.warningCount = newWarningCount;
    let testHeadingContainer = document.createElement("div");
    testHeadingContainer.setAttribute("class", "testHeading");
    let testHeading = document.createElement("span");
    testHeading.setAttribute("class", "testName");
    testHeading.textContent = test.name;
    testHeadingContainer.appendChild(testHeading);
    let errorCounter = document.createElement("span");
    errorCounter.setAttribute("class", "errorCount");
    errorCounter.textContent = matchesCount;
    testHeadingContainer.appendChild(errorCounter);
    testContainer.appendChild(testHeadingContainer);

    let errorList = document.createElement("ul");
    errorList.setAttribute("class", "errors");
    testContainer.appendChild(errorList);

    tests.appendChild(testContainer);

    testElem = document.getElementById(id);

    if (prefs.autoExpandErrors && status !== "ok") {
      testElem.getElementsByClassName("errors")[0].classList.add("show");
    }

    let fixIssuesButton = document.getElementById("fixIssues");
    fixIssuesButton.classList.add("show");
  }

  let errors = testElem.getElementsByClassName("errors")[0];
  if (status === "ok") {
    errors.classList.remove("show");
  }
  while (errors.firstChild) {
    errors.removeChild(errors.firstChild);
  }
  test.errors.forEach(function(error) {
    let errorContainer = document.createElement("li");
    let errorClass = "error";
    switch (error.type) {
      case WARNING:
        errorClass = "warning";
        break;

      case INFO:
        errorClass = "info";
        break;
    }
    errorContainer.setAttribute("class", errorClass);
    errorContainer.textContent = error.msg;
    errors.appendChild(errorContainer);
  });

  totalWarningCount += newWarningCount - oldWarningCount;
  totalErrorCount += newErrorCount - oldErrorCount;

  updateErrorSummary();
});

addon.port.on("updateProgress", (progress) => {
  let progressBar = document.getElementById("testProgress");
  progressBar.value += progress;
});

addon.port.on("hideProgressBar", () => {
  let progressBar = document.getElementById("testProgress");
  progressBar.classList.remove("visible");
});

function getParentByClassName(node, className) {
  let currentNode = node;

  while (currentNode && (!currentNode.classList || !currentNode.classList.contains(className))) {
    currentNode = currentNode.parentNode;
  }

  return currentNode;
}

function updateErrorSummary() {
  // Show summary
  document.getElementById("summary").style.display = "flex";

  let totalErrorCounter = document.getElementById("totalErrorCount");
  totalErrorCounter.textContent = totalErrorCount;
  if (totalErrorCount === 0) {
    totalErrorCounter.classList.remove("hasErrors");
    totalErrorCounter.classList.add("ok");
  } else {
    totalErrorCounter.classList.remove("ok");
    totalErrorCounter.classList.add("hasErrors");
  }
  
  let totalWarningCounter = document.getElementById("totalWarningCount");
  totalWarningCounter.textContent = totalWarningCount;
  if (totalWarningCount === 0) {
    totalWarningCounter.classList.remove("hasWarnings");
    totalWarningCounter.classList.add("ok");
  } else {
    totalWarningCounter.classList.remove("ok");
    totalWarningCounter.classList.add("hasWarnings");
  }
}

function runTests() {
  let progressBar = document.getElementById("testProgress");
  progressBar.value = 0;
  progressBar.classList.add("visible");
  addon.port.emit("runTests");
}

function fixIssues() {
  addon.port.emit("fixIssues");
}
window.addEventListener("DOMContentLoaded", function loadTestSuite() {
  window.removeEventListener("DOMContentLoaded", loadTestSuite);

  document.addEventListener("contextmenu", function blockContextMenu(evt) {
    evt.preventDefault();
  });

  let runTestsButton = document.getElementById("btn-runtests");
  runTestsButton.addEventListener("click", runTests);

  let fixIssuesButton = document.getElementById("fixIssues");
  fixIssuesButton.addEventListener("click", fixIssues);
  
  let tests = document.getElementById("tests");
  tests.addEventListener("click", (evt) => {
    let testHeading = getParentByClassName(evt.originalTarget, "testHeading");
    if (testHeading) {
      let testElem = getParentByClassName(testHeading, "test");
      if (!testElem.classList.contains("ok")) {
        testElem.getElementsByClassName("errors")[0].classList.toggle("show");
      }
    }
  });
});
