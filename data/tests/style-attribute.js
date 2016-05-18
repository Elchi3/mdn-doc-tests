docTests.styleAttribute = {
  name: "style_attributes",
  desc: "style_attributes_desc",
  check: function checkStyleAttribute(rootElement) {
    let elementsWithStyleAttribute = rootElement.querySelectorAll("[style]");
    let matches = [];

    for (let i = 0; i < elementsWithStyleAttribute.length; i++) {
      let node = elementsWithStyleAttribute[i];

      // Exclude new paragraph helper
      if (node.localName === "span") {
        let style = node.getAttribute("style");
        if (style && /z-index:\s*9999;/.test(style)) {
          continue;
        }

        style = node.firstElementChild && node.firstElementChild.getAttribute("style");
        if (style && /z-index:\s*9999;/.test(style)) {
          continue;
        }
      }

      matches.push({
        msg: 'style="' + node.getAttribute("style") + '"',
        type: ERROR
      })
    }

    return matches;
  }
};