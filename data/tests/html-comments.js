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
      let comment = treeWalker.currentNode.data.replace(/\{cke_protected\}\{C\}(.+?)/, "$1");
      comment = decodeURI(comment).replace(/%2F/g, "/").trim();
      matches.push({
        msg: comment,
        type: ERROR
      });
    }

    return matches;
  }
};