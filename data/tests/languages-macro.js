docTests.languagesMacro = {
  name: "languages_macro",
  desc: "languages_macro_desc",
  check: function checkLanguagesMacro(rootElement) {
    var treeWalker = document.createTreeWalker(
        rootElement,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            return node.textContent.match(/\{\{\s*languages.*?\}\}/i) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          }
        }
    );
    var matches = [];

    while(treeWalker.nextNode()) {
      var textNodeMatches = treeWalker.currentNode.textContent.match(/\{\{\s*languages.*?\}\}/gi);
      textNodeMatches.forEach(match => {
        matches.push({
          msg: match,
          type: ERROR
        });
      });
    }

    return matches;
  }
};