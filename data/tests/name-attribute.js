docTests.nameAttribute = {
  name: "name_attributes",
  desc: "name_attributes_desc",
  check: function checkNameAttribute(rootElement) {
    var elementsWithStyleAttribute = rootElement.querySelectorAll("[name]");
    var matches = [];

    for (var i = 0; i < elementsWithStyleAttribute.length; i++) {
      matches.push({
        msg: 'name="' + elementsWithStyleAttribute[i].getAttribute("name") + '"'
      })
    }

    return matches;
  },
  type: ERROR,
  errors: []
};