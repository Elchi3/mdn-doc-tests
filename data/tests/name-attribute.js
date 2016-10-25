/*
 *  Title: Test for elements with 'name' attributes.
 *
 *  Example 1: <h2 name="Syntax">Syntax</h2> should rather be <h2 id="Syntax"Syntax</h2>.
 *
 *  Example 2: The name="" attribute in <p name="someunusedname">paragraph</h2> should rather be 
 *  removed.
 *
 *  Implementation notes: This test checks all elements containing 'name' attributes.
 */

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