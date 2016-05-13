docTests.httpLinks = {
  name: "http_links",
  desc: "http_links_desc",
  check: function checkHTTPLinks(rootElement) {
    var httpLinks = rootElement.querySelectorAll("a[href^='http://']");
    var matches = [];

    for (var i = 0; i < httpLinks.length; i++) {
      matches.push({
        msg: httpLinks[i].outerHTML,
        type: WARNING
      })
    }

    return matches;
  }
};