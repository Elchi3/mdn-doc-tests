docTests.absoluteURLsForInternalLinks = {
  name: "absolute_urls_for_internal_links",
  desc: "absolute_urls_for_internal_links_desc",
  check: function checkAbsoluteURLsForInternalLinks(rootElement) {
    var links = rootElement.getElementsByTagName("a");
    var matches = [];
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute("href");
      if (href && href.match(/(?:https?:)?\/\/developer\.mozilla\.org\//i)) {
        matches.push({
          msg: links[i].outerHTML,
          type: WARNING
        });
      }
    }

    return matches;
  },
  errors: []
};