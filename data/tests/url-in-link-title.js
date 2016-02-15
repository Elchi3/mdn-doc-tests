docTests.urlInLinkTitle = {
  name: "url_in_link_title",
  desc: "url_in_link_title_desc",
  check: function checkURLsInTitleAttributes(rootElement) {
    var linkElements = rootElement.getElementsByTagName("a");
    var matches = [];

    for (var i = 0; i < linkElements.length; i++) {
      if (linkElements[i].getAttribute("href").indexOf(linkElements[i].getAttribute("title")) !== -1) {
        matches.push({
          msg: linkElements[i].outerHTML
        });
      }
    }

    return matches;
  },
  type: ERROR,
  errors: []
};