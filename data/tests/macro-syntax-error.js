docTests.macroSyntaxError = {
  name: "macro_syntax_error",
  desc: "macro_syntax_error_desc",
  check: function checkMacroSyntaxError(rootElement) {
    function validateStringParams(macro) {
      var paramListStartIndex = macro.indexOf("(") + 1;
      var paramListEndMatch = macro.match(/\)*\s*\}{1,2}$/);
      var paramListEndIndex = macro.length - paramListEndMatch[0].length;
      var stringParamQuote = "";
      for (var i = paramListStartIndex; i < paramListEndIndex; i++) {
        if (macro[i] === "\"") {
          if (stringParamQuote === "") {
            stringParamQuote = "\"";
          } else if (stringParamQuote === "\"" && macro[i - 1] !== "\\") {
            stringParamQuote = "";
          }
        } else if (macro[i] === "'") {
          if (stringParamQuote === "") {
            stringParamQuote = "'";
          } else if (stringParamQuote === "'" && macro[i - 1] !== "\\") {
            stringParamQuote = "";
          }
        } else if (stringParamQuote === "" && macro[i].match(/[^\s,\d\-\.]/)) {
          return false;
        }
      }
      return stringParamQuote === "";
    }
    
    var treeWalker = document.createTreeWalker(
        rootElement,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            return node.textContent.match(/\{\{[^\(\}]*\([^\}]*\}\}|\{\{[^\}]*?\}(?:(?=[^\}])|$)/) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          }
        }
    );
    var matches = [];

    while(treeWalker.nextNode()) {
      var textNodeMatches = treeWalker.currentNode.textContent.match(/\{\{[^\(\}]*\([^\}]*\}\}|\{\{[^\}]*?\}(?:(?=[^\}])|$)/gi) || [];
      textNodeMatches.forEach(macro => {
        if (macro.match(/[^\}]\}$/)) {
          matches.push({
            msg: "missing_closing_curly_brace",
            msgParams: [macro],
            type: ERROR
          });
        }
        if (macro.match(/^\{\{[^\(]+\(.+?[^\)\s]\s*\}\}$/)) {
          matches.push({
            msg: "missing_closing_bracket",
            msgParams: [macro],
            type: ERROR
          });
        }
        if (!validateStringParams(macro)) {
          matches.push({
            msg: "string_parameter_incorrectly_quoted",
            msgParams: [macro],
            type: ERROR
          });
        }
        if (macro.match(/\){2,}\}{1,2}$/)) {
          matches.push({
            msg: "additional_closing_bracket",
            msgParams: [macro],
            type: ERROR
          });
        }
      });
    }

    return matches;
  }
};