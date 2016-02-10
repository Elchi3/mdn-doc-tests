docTests.htmlComments = {
  name: "html_comments",
  desc: "html_comments_desc",
  check: function checkHTMLComments(rootElement) {
    var treeWalker = document.createTreeWalker(
        rootElement,
        NodeFilter.SHOW_COMMENT
    );
    var matches = [];

    while(treeWalker.nextNode()) {
      matches.push({
        msg: "<!--" + treeWalker.currentNode.data + "-->"
      });
    }

    return matches;
  },
  type: ERROR,
  errors: []
};