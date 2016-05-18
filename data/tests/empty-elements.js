docTests.emptyElements = {
  name: "empty_elements",
  desc: "empty_elements_desc",
  check: function checkEmptyElements(rootElement) {
    let treeWalker = document.createTreeWalker(
        rootElement,
        NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: (node) => {
            // matching self-closing elements and excluding them
            if(!node.localName.match(/^link|track|param|area|command|col|base|meta|hr|source|img|keygen|br|wbr|input$/i) &&
                node.textContent.match(/^(?:&nbsp;|\s|\n)*$/)) {

              // Exclude new paragraph helper
              if (node.localName === "span" && node.firstElementChild) {
                let style = node.firstElementChild.getAttribute("style");
                if (style && /z-index:\s*9999;/.test(style)) {
                  return NodeFilter.FILTER_REJECT;
                }
              }

              // Elements containing self-closing elements except <br> and <wbr> are considered non-empty
              let descendantSelfClosingElements = node.querySelectorAll(
                  "link,track,param,area,command,col,base,meta,hr,source,img,keygen,input");
              return descendantSelfClosingElements.length === 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            } else {
              return NodeFilter.FILTER_REJECT;
            }
          }
        }
    );
    let matches = [];

    while(treeWalker.nextNode()) {
      matches.push({
        msg: treeWalker.currentNode.outerHTML,
        type: ERROR
      });
    }

    return matches;
  }
};