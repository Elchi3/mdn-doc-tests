docTests.summaryHeading = {
  name: "summary_heading",
  desc: "summary_heading_desc",
  check: function checkSummaryHeading(rootElement) {
    var headlines = rootElement.querySelectorAll("h1, h2, h3, h4, h5, h6");
    var matches = [];

    for (var i = 0; i < headlines.length; i++) {
      if (headlines[i].textContent.match(/^\s*Summary\s*$/)) {
        matches.push({
          msg: headlines[i].outerHTML
        })
      }
    }

    return matches;
  },
  type: ERROR,
  errors: []
};