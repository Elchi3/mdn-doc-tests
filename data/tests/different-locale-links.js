docTests.differentLocaleLinks = {
  name: "different_locale_links",
  desc: "different_locale_links_desc",
  check: function checkDifferentLocaleLinks(rootElement) {
    var [, pageDomain, pageLocale] = document.URL.match(/^(?:https?:\/\/)(.+?)\/([^\/]+)/i) ||
        ["", "developer.mozilla.org", "en-US"];
    var links = rootElement.getElementsByTagName("a");
    var matches = [];
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute("href");
      if (href) {
        var [, linkDomain, linkLocale] = href.match(/^(?:https?:\/\/(.+?))?\/([^\/]+)/i) ||
            [null, null, null];
        if ((!linkDomain || linkDomain === pageDomain) && linkLocale !== pageLocale)
        matches.push({
          msg: "link_using_wrong_locale",
          msgParams: [href, pageLocale]
        });
      }
    }

    return matches;
  },
  type: ERROR,
  errors: []
};