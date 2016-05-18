docTests.nameAttribute = {
  name: "name_attributes",
  desc: "name_attributes_desc",
  check: function checkNameAttribute(rootElement) {
    let elementsWithStyleAttribute = rootElement.querySelectorAll("[name]");
    let matches = [];

    for (let i = 0; i < elementsWithStyleAttribute.length; i++) {
      matches.push({
        msg: 'name="' + elementsWithStyleAttribute[i].getAttribute("name") + '"',
        type: ERROR
      })
    }

    return matches;
  }
};