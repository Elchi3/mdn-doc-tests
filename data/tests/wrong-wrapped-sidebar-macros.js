docTests.wrongWrappedSidebarMacros = {
  name: "wrong_wrapped_sidebar_macros",
  desc: "wrong_wrapped_sidebar_macros_desc",
  check: function checkWrongWrappedSidebarMacros(rootElement) {
    const allowedMacros = /^(?:|apiref|cssref|htmlref|makesimplequicklinks|mathmlref|svgrefelem)$|sidebar$/i;

    let treeWalker = document.createTreeWalker(
        rootElement,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            return node.textContent.match(/\{\{.*?\}\}/) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          }
        }
    );
    let matches = [];

    while(treeWalker.nextNode()) {
      let reMacroName = /\{\{\s*([^\(\}\s]+).*?\}\}/g;
      let macroNameMatch = reMacroName.exec(treeWalker.currentNode.textContent);
      while (macroNameMatch) {
        if (macroNameMatch[1].match(allowedMacros) !== null &&
            treeWalker.currentNode.parentElement.localName !== 'div') {
          matches.push({
            msg: "wrong_element_wrapping_sidebar_macro",
            msgParams: [macroNameMatch[0], treeWalker.currentNode.parentElement.localName],
            type: ERROR
          });
        }
        macroNameMatch = reMacroName.exec(treeWalker.currentNode.textContent);
      }
    }

    return matches;
  }
};