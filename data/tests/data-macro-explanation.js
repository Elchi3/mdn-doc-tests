const dataMacros = /^(?:compat|css_ref|cssanimatedproperties|cssinfo|csssyntax|webextbrowsercompat)$/i;

docTests.dataMacroExplanation = {
  name: "data_macro_explanation",
  desc: "data_macro_explanation_desc",
  check: function checkDataMacroExplanation(rootElement) {

    let treeWalker = document.createTreeWalker(
        rootElement,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            return node.textContent.match(/\{\{.*?\}\}/) ?
                NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          }
        }
    );
    let matches = [];

    while(treeWalker.nextNode()) {
      let reMacroName = /\{\{\s*([^\(\}\s]+).*?\}\}/g;
      let macroNameMatch = reMacroName.exec(treeWalker.currentNode.textContent);
      while (macroNameMatch) {
        let explanationElement = treeWalker.currentNode.parentNode.previousSibling;
        if(dataMacros.test(macroNameMatch[1])) {
           if(!explanationElement || !explanationElement.classList.contains("hidden")) {
            matches.push({
              msg: "data_macro_explanation_missing",
              msgParams: [macroNameMatch[0]],
              type: ERROR
            });
          } else if(!explanationElement.querySelector("[href^='http']")) {
            matches.push({
              msg: "data_macro_source_link_missing",
              msgParams: [macroNameMatch[0]],
              type: ERROR
            });
          }
        }
        macroNameMatch = reMacroName.exec(treeWalker.currentNode.textContent);
      }
    }

    return matches;
  }
};