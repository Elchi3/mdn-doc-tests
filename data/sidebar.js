const ERROR = 1;
const WARNING = 2;

let totalErrorCount = 0;
let totalWarningCount = 0;

addon.port.on("showTestResult", function(test, id, prefs) {
  let tests = document.getElementById("tests");
  let errorCount = test.errors.length;
  let status = "ok";
  if (errorCount !== 0) {
    if (test.errors.some(match => match.type === ERROR)) {
      status = "hasErrors";
    } else if (test.errors.some(match => match.type === WARNING)) {
      status = "hasWarnings";
    }
  }

  tests.classList.toggle("hidePassingTests", prefs.hidePassingTests);

  let testElem = document.getElementById(id);
  if (tests.contains(testElem)) {
    testElem.getElementsByClassName("errorCount")[0].textContent = errorCount;
    testElem.classList.remove("hasErrors", "hasWarnings", "ok");
    testElem.classList.add(status);
  } else {
    let testContainer = document.createElement("li");
    testContainer.setAttribute("class", "test " + status);
    testContainer.setAttribute("id", id);
    testContainer.setAttribute("title", test.desc);
    let testHeadingContainer = document.createElement("div");
    testHeadingContainer.setAttribute("class", "testHeading");
    let testHeading = document.createElement("span");
    testHeading.setAttribute("class", "testName");
    testHeading.textContent = test.name;
    testHeadingContainer.appendChild(testHeading);
    let errorCounter = document.createElement("span");
    errorCounter.setAttribute("class", "errorCount");
    errorCounter.textContent = errorCount;
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
    errorContainer.setAttribute("class", error.type === WARNING ? "warning" : "error");
    errorContainer.textContent = error.msg;
    errors.appendChild(errorContainer);
  });

  if (errorCount !== 0) {
    totalWarningCount += test.errors.filter(match => match.type === WARNING).length;
    totalErrorCount += test.errors.filter(match => match.type === ERROR).length;
  }
  updateErrorSummary();
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
  totalErrorCount = 0;
  totalWarningCount = 0;
  addon.port.emit("runTests");
}

window.addEventListener("DOMContentLoaded", function loadTestSuite() {
  window.removeEventListener("DOMContentLoaded", loadTestSuite);

  document.addEventListener("contextmenu", function blockContextMenu(evt) {
    evt.preventDefault();
  });

  let btn = document.getElementById("btn-runtests");
  btn.addEventListener("click", runTests);

  setInterval(runTests, 10000);

  let tests = document.getElementById("tests");
  tests.addEventListener("click", (evt) => {
    let testHeading = getParentByClassName(evt.originalTarget, "testHeading");
    if (testHeading) {
      let testElem = getParentByClassName(testHeading, "test");
      if (testElem.classList.contains("hasErrors") || testElem.classList.contains("hasWarnings")) {
        testElem.getElementsByClassName("errors")[0].classList.toggle("show");
      }
    }
  });
});
