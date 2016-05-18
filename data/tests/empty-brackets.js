docTests.emptyBrackets = {
  name: "empty_brackets",
  desc: "empty_brackets_desc",
  check: function checkEmptyBrackets(rootElement) {
    var treeWalker = document.createTreeWalker(
        rootElement,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            return node.textContent.match(/\{\{\s*[a-z]*\(\)\s*?\}\}/i) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          }
        }
    );
    var matches = [];

    while(treeWalker.nextNode()) {
      var textNodeMatches = treeWalker.currentNode.textContent.match(/\{\{\s*[a-z]*\(\)\s*?\}\}/gi) || [];
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