docTests.wrongSyntaxClass = {
  name: "wrong_syntax_class",
  desc: "wrong_syntax_class_desc",
  check: function checkWrongSyntaxClass(rootElement) {
    function checkPre(heading) {
      let element = heading.nextSibling;
      while (element && element.localName !== "h2") {
        if (element.localName === "pre" && element.className !== "syntaxbox") {
          return {
            msg: "wrong_syntax_class_used",
            msgParams: [element.className],
            type: ERROR
          };
          break;
        }
        element = element.nextElementSibling;
      }
    }

    let subHeadings = rootElement.getElementsByTagName("h3");
    let formalSyntaxSection = null;
    for (let i = 0; !formalSyntaxSection && i < subHeadings.length; i++) {
      if (subHeadings[i].textContent.match(/Formal syntax/i)) {
        formalSyntaxSection = subHeadings[i];
      }
    }

    let syntaxBoxClass;
    let matches = [];
    if (formalSyntaxSection) {
      let match = checkPre(formalSyntaxSection);
      if (match) {
        matches.push(match);
      }
    } else {
      let headings = rootElement.getElementsByTagName("h2");
      let syntaxSection = null;
      for (let i = 0; !syntaxSection && i < headings.length; i++) {
        if (headings[i].textContent.toLowerCase() === "syntax") {
          syntaxSection = headings[i];
        }
      }

      if (syntaxSection) {
        let match = checkPre(syntaxSection);
        if (match) {
          matches.push(match);
        }
      }
    }

    return matches;
  }
};