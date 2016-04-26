docTests.apiSyntaxHeadlines = {
  name: "api_syntax_headlines",
  desc: "api_syntax_headlines_desc",
  check: function checkAPISyntaxHeadlines(rootElement) {
    const disallowedNames = new Set(["returns", "errors", "errors thrown"]);
    const validOrder = [
      new Set(["parameters"]),
      new Set(["return value", "returns"]),
      new Set(["exceptions", "errors", "errors thrown"])
    ];
    var headlines = rootElement.getElementsByTagName("h2");
    var syntaxSection = null;
    var order = [];
    var matches = [];
    for (var i = 0; !syntaxSection && i < headlines.length; i++) {
      if (headlines[i].textContent === "Syntax") {
        syntaxSection = headlines[i];
      }
    }

    if (syntaxSection) {
      var subHeadings = [];
      var element = syntaxSection.nextSibling;
      while (element && element.localName !== "h2") {
        if (element.localName === "h3") {
          subHeadings.push(element.textContent);
        }
        element = element.nextSibling;
      }
      for (var i = 0; i < subHeadings.length; i++) {
        var subHeading = subHeadings[i];
        for (var j = 0; j < validOrder.length; j++) {
          var heading = validOrder[j];
          if (heading.has(subHeading.toLowerCase())) {
            order.push(j);
          }
        }
        if (disallowedNames.has(subHeading.toLowerCase())) {
          matches.push({
            msg: "invalid_headline_name",
            msgParams: [subHeadings[i]],
            type: ERROR
          });
        }
      }

      // Check the order of the headlines
      for (var i = 1; i < order.length; i++) {
        if (order[i] < order[i - 1]) {
          matches.push({
            msg: "invalid_headline_order",
            type: ERROR
          });
        }
      }
    }

    return matches;
  },
  count: 0
};