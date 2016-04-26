docTests.alertPrintInCode = {
  name: "alert_print_in_code",
  desc: "alert_print_in_code_desc",
  check: function checkAlertPrintInCode(rootElement) {
    var pres = rootElement.getElementsByTagName("pre");
    var matches = [];
    for (var i = 0; i < pres.length; i++) {
      var preMatches = pres[i].textContent.match(/(?:alert|print|eval|document\.write)\s*\((?:.|\n)+?\)/gi) || [];
      matches = matches.concat(mapMatches(preMatches, ERROR));
    }

    return matches;
  },
  errors: []
};