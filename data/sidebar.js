addon.port.on("test", function(test) {
  var tests = document.getElementById("tests");
  var status = test.count > 0 ? "hasErrors": "ok";
  var testElem = document.getElementById(test.id);
  if (tests.contains(testElem)) {
    testElem.getElementsByClassName("errorCount")[0].textContent = test.count;
    testElem.classList.remove("hasErrors", "ok");
    testElem.classList.add(status);
  } else {
    tests.innerHTML += "<li class=\"test " + status + "\" id=\"" + test.id +
                       "\" title=\"" + test.desc + "\"><span " +
                       "class=\"testName\">" + test.name + "</span>: " +
                       "<span class=\"errorCount\">" + test.count + "</span>" +
                       "</div>";
  }
});

window.addEventListener("DOMContentLoaded", function() {
  var btn = document.getElementById("btn-runtests");
  btn.addEventListener("click", function(event) {
    addon.port.emit("runTests");
  });

  setInterval(function() {
    addon.port.emit("runTests");
  }, 10000);
});
