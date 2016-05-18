docTests.absoluteURLsForInternalLinks = {
  name: "absolute_urls_for_internal_links",
  desc: "absolute_urls_for_internal_links_desc",
  check: function checkAbsoluteURLsForInternalLinks(rootElement) {
    let links = rootElement.getElementsByTagName("a");
    let matches = [];
    for (let i = 0; i < links.length; i++) {
      let href = links[i].getAttribute("href");
      if (href && href.match(/(?:https?:)?\/\/developer\.mozilla\.org\//i)) {
        matches.push({
          msg: links[i].outerHTML,
          type: WARNING
        });
      }
    }

    return matches;
  }
};