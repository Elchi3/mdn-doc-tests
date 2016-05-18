docTests.codeInPre = {
  name: "code_in_pre",
  desc: "code_in_pre_desc",
  check: function checkCodeInPre(rootElement) {
    let codesInPres = rootElement.querySelectorAll("pre code");
    let matches = [];

    for (let i = 0; i < codesInPres.length; i++) {
      matches.push({
        msg: codesInPres[i].outerHTML,
        type: ERROR
      });
    }

    return matches;
  }
};