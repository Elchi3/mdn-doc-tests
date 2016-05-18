docTests.summaryHeading = {
  name: "summary_heading",
  desc: "summary_heading_desc",
  check: function checkSummaryHeading(rootElement) {
    let headlines = rootElement.querySelectorAll("h1, h2, h3, h4, h5, h6");
    let matches = [];

    for (let i = 0; i < headlines.length; i++) {
      if (headlines[i].textContent.match(/^\s*Summary\s*$/)) {
        matches.push({
          msg: headlines[i].outerHTML,
          type: ERROR
        })
      }
    }

    return matches;
  }
};