docTests.oldURLs = {
  name: "old_en_urls",
  desc: "old_en_urls_desc",
  check: function checkOldURLs(rootElement) {
    var links = rootElement.querySelectorAll("a[href]");
    var matches = [];

    for (var i = 0; i < links.length; i++) {
      // This check can be removed once querySelectorAll supports case-insensitive search,
      // i.e. a[href^='/en/' i] (see bug 888190, fixed in Firefox 47.0)
      if (links[i].getAttribute("href").match(/^\/en\//i)) {
        matches.push({
          msg: links[i].outerHTML
        });
      }
    }

    return matches;
  },
  type: ERROR,
  errors: []
};