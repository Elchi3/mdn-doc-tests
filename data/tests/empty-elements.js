docTests.emptyElements = {
  name: "empty_elements",
  desc: "empty_elements_desc",
  check: function checkEmptyElements(rootElement) {
    var treeWalker = document.createTreeWalker(
        rootElement,
        NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: (node) => {
            // matching self-closing elements and excluding them
            if (node.localName.match(/^(?:link|track|param|area|command|col|base|meta|hr|source|img|keygen|br|wbr|input)$/i)) {
              return NodeFilter.FILTER_REJECT;
            }

            // Exclude new paragraph helper
            if (node.localName === "span" && node.firstElementChild) {
              var style = node.firstElementChild.getAttribute("style");
              if (style && /z-index:\s*9999;/.test(style)) {
                return NodeFilter.FILTER_REJECT;
              }
            }

            return node.textContent.match(/^(?:&nbsp;|\s|\n)*$/) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
          }
        }
    );
    var matches = [];

    while(treeWalker.nextNode()) {
      matches.push({
        msg: treeWalker.currentNode.outerHTML
      });
    }

    return matches;
  },
  type: ERROR,
  errors: []
};