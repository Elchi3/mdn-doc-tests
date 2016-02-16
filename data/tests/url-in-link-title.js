docTests.urlInLinkTitle = {
  name: "url_in_link_title",
  desc: "url_in_link_title_desc",
  check: function checkURLsInTitleAttributes(rootElement) {
    var linkElements = rootElement.getElementsByTagName("a");
    var matches = [];

    for (var i = 0; i < linkElements.length; i++) {
      var href  = linkElements[i].getAttribute("href");
      var title = linkElements[i].getAttribute("title");
      if (href.indexOf(title) !== -1 || (title && title.match(/[a-z]{2}(?:-[A-Z]{2})?\/docs\/.*?\//))) {
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