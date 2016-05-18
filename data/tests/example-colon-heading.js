docTests.exampleColonHeading = {
  name: "example_headings",
  desc: "example_headings_desc",
  check: function checkExampleColonHeading(rootElement) {
    var headlines = rootElement.querySelectorAll("h1, h2, h3, h4, h5, h6");
    var matches = [];

    for (var i = 0; i < headlines.length; i++) {
      if (headlines[i].textContent.match(/^\s*Example:/)) {
        matches.push({
          msg: headlines[i].outerHTML,
          type: ERROR
        })
      }
    }

    return matches;
  }
};