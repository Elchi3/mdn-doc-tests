docTests.styleAttribute = {
  name: "style_attributes",
  desc: "style_attributes_desc",
  check: function checkStyleAttribute(rootElement) {
    let elementsWithStyleAttribute = rootElement.querySelectorAll("[style]");
    let matches = [];

    for (let i = 0; i < elementsWithStyleAttribute.length; i++) {
      let node = elementsWithStyleAttribute[i];

      // Exclude new paragraph helper
      if (isNewParagraphHelper(node) || isNewParagraphHelper(node.firstElementChild)) {
        continue;
      }

      matches.push({
        msg: 'style="' + node.getAttribute("style") + '"',
        type: ERROR
      })
    }

    return matches;
  }
};