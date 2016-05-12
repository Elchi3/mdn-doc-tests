docTests.spanCount = {
  name: "span_elements",
  desc: "span_elements_desc",
  check: function checkSpanCount(rootElement) {
    var spanElements = rootElement.querySelectorAll("span:not(.seoSummary)");
    var matches = [];

    for (var i = 0; i < spanElements.length; i++) {
      var node = spanElements[i];

      // Exclude new paragraph helper
      var style = node.getAttribute("style");
      if (style && /z-index:\s*9999;/.test(style)) {
        continue;
      }

      style = node.firstElementChild && node.firstElementChild.getAttribute("style");
      if (style && /z-index:\s*9999;/.test(style)) {
        continue;
      }

      matches.push({
        msg: node.outerHTML
      })
    }

    return matches;
  },
  type: ERROR,
  errors: []
};