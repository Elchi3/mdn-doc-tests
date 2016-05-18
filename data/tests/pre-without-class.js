docTests.preWithoutClass = {
  name: "pre_without_class",
  desc: "pre_without_class_desc",
  check: function checkPreWithoutClass(rootElement) {
    let presWithoutClass = rootElement.querySelectorAll("pre:-moz-any(:not([class]), [class=''])");
    let matches = [];

    for (let i = 0; i < presWithoutClass.length; i++) {
      matches.push({
        msg: presWithoutClass[i].outerHTML,
        type: ERROR
      })
    }

    return matches;
  }
};