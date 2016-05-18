docTests.urlInLinkTitle = {
  name: "url_in_link_title",
  desc: "url_in_link_title_desc",
  check: function checkURLsInTitleAttributes(rootElement) {
    let linkElements = rootElement.getElementsByTagName("a");
    let matches = [];

    for (let i = 0; i < linkElements.length; i++) {
      let href = (linkElements[i].getAttribute("href") || "").toLowerCase();
      let title = (linkElements[i].getAttribute("title") || "").toLowerCase();
      if (title !== "" && (href.indexOf(title) !== -1 ||
          (title.match(/[a-z]{2}(?:-[A-Z]{2})?\/docs\/.*?\//) ||
           title === href.replace(/([a-z]{2})(?:-[a-z]{2})?\/docs\/(.*)/, "$1/$2")))) {
        matches.push({
          msg: linkElements[i].outerHTML,
          type: ERROR
        });
      }
    }

    return matches;
  }
};