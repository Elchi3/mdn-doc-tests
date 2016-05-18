docTests.alertPrintInCode = {
  name: "alert_print_in_code",
  desc: "alert_print_in_code_desc",
  check: function checkAlertPrintInCode(rootElement) {
    let pres = rootElement.getElementsByTagName("pre");
    let matches = [];
    for (let i = 0; i < pres.length; i++) {
      let preMatches = pres[i].textContent.match(/(?:alert|print|eval|document\.write)\s*\((?:.|\n)+?\)/gi) || [];
      matches = matches.concat(mapMatches(preMatches, ERROR));
    }

    return matches;
  }
};