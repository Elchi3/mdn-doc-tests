docTests.lineLengthInPre = {
  name: "pre_line_too_long",
  desc: "pre_line_too_long_desc",
  check: function checkLineLengthInPre(rootElement) {
    var pres = rootElement.getElementsByTagName("pre");
    var matches = [];

    for (var i = 0; i < pres.length; i++) {
      // While editing it happens that there are <br>s added instead of line break characters
      // Those need to be replaced by line breaks to correctly recognize long lines
      var codeBlock = pres[i].innerHTML.replace(/<br\/?>/g, "\n");

      // Remove all other HTML tags and only display the plain text
      var codeBlock = codeBlock.replace(/<.+?>/g, "");

      var longLines = codeBlock.match(/^(?:[^\r\n]|\r(?!\n)){78,}$/gm);
      if (longLines) {
        matches = matches.concat(longLines);
      }
    }

    return mapMatches(matches, WARNING);
  }
};