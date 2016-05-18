docTests.fontElements = {
  name: "font_elements",
  desc: "font_elements_desc",
  check: function checkFontElements(rootElement) {
    let fontElements = rootElement.getElementsByTagName("font");
    let matches = [];

    for (let i = 0; i < fontElements.length; i++) {
      matches.push({
        msg: fontElements[i].outerHTML,
        type: ERROR
      })
    }

    return matches;
  }
};