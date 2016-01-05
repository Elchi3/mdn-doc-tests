const WARNING = 2;

addon.port.on("test", function(test, id) {
  var tests = document.getElementById("tests");
  var errorsCount = test.errors.length;
  var status = "ok";
  if (errorsCount > 0) {
    status = test.type === WARNING ? "hasWarnings" : "hasErrors";
  }
  var testElem = document.getElementById(id);
  if (tests.contains(testElem)) {
    testElem.getElementsByClassName("errorCount")[0].textContent = errorsCount;
    testElem.classList.remove("hasErrors", "hasWarnings", "ok");
    testElem.classList.add(status);
  } else {
    tests.innerHTML += "<li class=\"test " + status + "\" id=\"" + id +
                       "\" title=\"" + test.desc + "\"><div><span " +
                       "class=\"testName\">" + test.name + "</span>: " +
                       "<span class=\"errorCount\">" + errorsCount + "</span>" +
                       "</div><ul class=\"errors\"></ul></div>";
    testElem = document.getElementById(id);
  }

  var errors = testElem.getElementsByClassName("errors")[0];
  if (status === "ok") {
    errors.classList.remove("show");
  }
  errors.innerHTML = "";
  test.errors.forEach(function(error) {
    errors.innerHTML += "<li>" + error.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</li>";
  });
});

function getParentByClassName(node, className) {
  var currentNode = node;

  while (currentNode && (!currentNode.classList || !currentNode.classList.contains(className))) {
    currentNode = currentNode.parentNode;
  }

  return currentNode;
}

window.addEventListener("DOMContentLoaded", function() {
  var btn = document.getElementById("btn-runtests");
  btn.addEventListener("click", function(event) {
    addon.port.emit("runTests");
  });

  setInterval(function() {
    addon.port.emit("runTests");
  }, 10000);

  var tests = document.getElementById("tests");
  tests.addEventListener("click", (evt) => {
    var testElem = getParentByClassName(evt.originalTarget, "test");
    if (testElem.classList.contains("hasErrors") || testElem.classList.contains("hasWarnings")) {
      testElem.getElementsByClassName("errors")[0].classList.toggle("show");
    }
  });
});
