docTests.htmlComments = {
  name: "html_comments",
  desc: "html_comments_desc",
  check: function checkHTMLComments(rootElement) {
    let treeWalker = document.createTreeWalker(
        rootElement,
        NodeFilter.SHOW_COMMENT
    );
    let matches = [];

    while(treeWalker.nextNode()) {
      let comment = treeWalker.currentNode.data.replace(/\s*\{cke_protected\}\{C\}(\S+)\s*/,
          function(match, data) { return decodeURIComponent(data); });
      matches.push({
        msg: comment,
        type: ERROR
      });
    }

    return matches;
  }
};