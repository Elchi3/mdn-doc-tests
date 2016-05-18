docTests.spanCount = {
  name: "span_elements",
  desc: "span_elements_desc",
  check: function checkSpanCount(rootElement) {
    let spanElements = rootElement.querySelectorAll("span:not(.seoSummary)");
    let matches = [];

    for (let i = 0; i < spanElements.length; i++) {
      let node = spanElements[i];

      // Exclude new paragraph helper
      let style = node.getAttribute("style");
      if (style && /z-index:\s*9999;/.test(style)) {
        continue;
      }

      style = node.firstElementChild && node.firstElementChild.getAttribute("style");
      if (style && /z-index:\s*9999;/.test(style)) {
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