docTests.styleAttribute = {
  name: "style_attributes",
  desc: "style_attributes_desc",
  check: function checkStyleAttribute(rootElement) {
    var elementsWithStyleAttribute = rootElement.querySelectorAll("[style]");
    var matches = [];

    for (var i = 0; i < elementsWithStyleAttribute.length; i++) {
      var node = elementsWithStyleAttribute[i];

      // Exclude new paragraph helper
      if (node.localName === "span") {
        var style = node.getAttribute("style");
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
  },
  errors: []
};