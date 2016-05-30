docTests.spanCount = {
  name: "span_elements",
  desc: "span_elements_desc",
  check: function checkSpanCount(rootElement) {
    let spanElements = rootElement.querySelectorAll("span:not(.seoSummary)");
    let matches = [];

    for (let i = 0; i < spanElements.length; i++) {
      let node = spanElements[i];

      // Exclude new paragraph helper
      if (isNewParagraphHelper(node) || isNewParagraphHelper(node.firstElementChild)) {
        continue;
      }

      matches.push({
        msg: node.outerHTML,
        type: ERROR
      })
    }

    return matches;
  }
};