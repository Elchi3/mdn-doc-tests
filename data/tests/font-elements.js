docTests.fontElements = {
  name: "font_elements",
  desc: "font_elements_desc",
  check: function checkFontElements(rootElement) {
    var fontElements = rootElement.getElementsByTagName("font");
    var matches = [];

    for (var i = 0; i < fontElements.length; i++) {
      matches.push({
        msg: fontElements[i].outerHTML,
        type: ERROR
      })
    }

    return matches;
  }
};