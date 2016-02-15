docTests.spanCount = {
  name: "span_elements",
  desc: "span_elements_desc",
  check: function checkSpanCount(rootElement) {
    var spanElements = rootElement.querySelectorAll("span:not(.seoSummary)");
    var matches = [];

    for (var i = 0; i < spanElements.length; i++) {
      matches.push({
        msg: spanElements[i].outerHTML
      })
    }

    return matches;
  },
  type: ERROR,
  errors: []
};