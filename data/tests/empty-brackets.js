/*
 *  Title: Test for macros with empty brackets.
 *
 *  Example 1: The {{CompatNo}} macro does not expect any parameters, so the parameter brackets 
 *  are redundant and should be avoided, i.e. it should not be written as {{CompatNo()}}.
 *
 *  Implementation notes: This test checks for macros written with empty brackets and requests to 
 *  remove them. It does not check whether the macros actually require parameters.
 */

docTests.emptyBrackets = {
  name: "empty_brackets",
  desc: "empty_brackets_desc",
  check: function checkEmptyBrackets(rootElement) {
    let treeWalker = document.createTreeWalker(
        rootElement,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            return node.textContent.match(/\{\{\s*[a-z]*\(\)\s*?\}\}/i) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          }
        }
    );
    let matches = [];

    while(treeWalker.nextNode()) {
      let textNodeMatches = treeWalker.currentNode.textContent.match(/\{\{\s*[a-z]*\(\)\s*?\}\}/gi) || [];
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