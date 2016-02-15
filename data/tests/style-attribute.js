docTests.styleAttribute = {
  name: "style_attributes",
  desc: "style_attributes_desc",
  check: function checkStyleAttribute(rootElement) {
    var elementsWithStyleAttribute = rootElement.querySelectorAll("[style]");
    var matches = [];

    for (var i = 0; i < elementsWithStyleAttribute.length; i++) {
      matches.push({
        msg: 'style="' + elementsWithStyleAttribute[i].getAttribute("style") + '"'
      })
    }

    return matches;
  },
  type: ERROR,
  errors: []
};