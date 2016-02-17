docTests.urlInLinkTitle = {
  name: "url_in_link_title",
  desc: "url_in_link_title_desc",
  check: function checkURLsInTitleAttributes(rootElement) {
    var linkElements = rootElement.getElementsByTagName("a");
    var matches = [];

    for (var i = 0; i < linkElements.length; i++) {
      var href = (linkElements[i].getAttribute("href") || "").toLowerCase();
      var title = (linkElements[i].getAttribute("title") || "").toLowerCase();
      if (title !== "" && (href.indexOf(title) !== -1 ||
          (title.match(/[a-z]{2}(?:-[A-Z]{2})?\/docs\/.*?\//) ||
           title === href.replace(/([a-z]{2})(?:-[a-z]{2})?\/docs\/(.*)/, "$1/$2")))) {
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