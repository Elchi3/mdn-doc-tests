var btn = document.getElementById("btn-runtests");
btn.onclick = function(event) {
    addon.port.emit("runTests");
};

setInterval(function() {
  addon.port.emit("runTests");
}, 10000);

addon.port.on("test", function(test) {
  var tests = document.getElementById("tests");
  var status = test.count > 0 ? "red": "green";
  var testElem = document.getElementById(test.id);
  if (tests.contains(testElem)) {
    testElem.innerHTML = test.name + ': ' + test.count;
    testElem.classList.remove("red", "green");
    testElem.classList.add(status);
  } else {
    tests.innerHTML += '<div class="test ' + status +'" id="' + test.id +
                       '" title="' + test.desc + '">' +
                       test.name + ': ' + test.count + '</div>';
  }
});
