docTests.httpLinks = {
  name: "http_links",
  desc: "http_links_desc",
  check: function checkHTTPLinks(rootElement) {
    let httpLinks = rootElement.querySelectorAll("a[href^='http://']");
    let matches = [];

    for (let i = 0; i < httpLinks.length; i++) {
      matches.push({
        msg: httpLinks[i].outerHTML,
        type: WARNING
      })
    }

    return matches;
  }
};