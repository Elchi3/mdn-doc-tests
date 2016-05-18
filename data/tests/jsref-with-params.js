docTests.jsRefWithParams = {
  name: "jsref_params",
  desc: "jsref_params_desc",
  check: function checkJSRefWithParams(rootElement) {
    let treeWalker = document.createTreeWalker(
        rootElement,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            return node.textContent.match(/\{\{s*JSRef\(.*?\}\}/i) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          }
        }
    );
    let matches = [];

    while(treeWalker.nextNode()) {
      let textNodeMatches = treeWalker.currentNode.textContent.match(/\{\{s*JSRef\(.*?\}\}/gi) || [];
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