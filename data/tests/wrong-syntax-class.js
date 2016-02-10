docTests.wrongSyntaxClass = {
  name: "wrong_syntax_class",
  desc: "wrong_syntax_class_desc",
  check: function checkWrongSyntaxClass(rootElement) {
    function checkPre(heading) {
      var element = heading.nextSibling;
      while (element && element.localName !== "h2") {
        if (element.localName === "pre" && element.className !== "syntaxbox") {
          return {
            msg: "wrong_syntax_class_used",
            msgParams: [element.className]
          };
          break;
        }
        element = element.nextElementSibling;
      }
    }

    var subHeadings = rootElement.getElementsByTagName("h3");
    var formalSyntaxSection = null;
    for (var i = 0; !formalSyntaxSection && i < subHeadings.length; i++) {
      if (subHeadings[i].textContent.match(/Formal syntax/i)) {
        formalSyntaxSection = subHeadings[i];
      }
    }

    var syntaxBoxClass;
    var matches = [];
    if (formalSyntaxSection) {
      var match = checkPre(formalSyntaxSection);
      if (match) {
        matches.push(match);
      }
    } else {
      var headings = rootElement.getElementsByTagName("h2");
      var syntaxSection = null;
      for (var i = 0; !syntaxSection && i < headings.length; i++) {
        if (headings[i].textContent.toLowerCase() === "syntax") {
          syntaxSection = headings[i];
        }
      }

      if (syntaxSection) {
        var match = checkPre(syntaxSection);
        if (match) {
          matches.push(match);
        }
      }
    }

    return matches;
  },
  type: ERROR,
  count: 0
};