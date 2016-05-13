docTests.wrongHighlightedLine = {
  name: "wrong_highlighted_line",
  desc: "wrong_highlighted_line_desc",
  check: function checkWrongHighlightedLine(rootElement) {
    var presWithHighlighting = rootElement.querySelectorAll("pre[class*='highlight']");
    var matches = [];

    for (var i = 0; i < presWithHighlighting.length; i++) {
      var match = presWithHighlighting[i].getAttribute("class").match(/highlight:?\s*\[(.+?)\]/i);
      if (match) {
        var numbersAndRanges = match[1].split(",");
        var lineCount = presWithHighlighting[i].innerHTML.split(/<br\s*\/?>|\n/gi).length;

        numbersAndRanges.forEach((numberOrRange, i, numbersAndRanges) => {
          var start;
          var end;
          try {
            [,start,end] = numberOrRange.match(/^\s*(-?\d+)(?:\s*-\s*(-?\d+))?\s*$/);
          } catch (e) {}

          if (start === undefined) {
            return;
          }

          start = Number(start);
          end = Number(end);

          if (start <= 0) {
            matches.push({
              msg: "highlighted_line_number_not_positive",
              msgParams: [String(start), match[1]],
              type: ERROR
            });
          }
          if (start > lineCount) {
            matches.push({
              msg: "highlighted_line_number_too_big",
              msgParams: [String(start), String(lineCount), match[1]],
              type: ERROR
            });
          }
          if (!Number.isNaN(end)) {
            if (end > lineCount) {
              matches.push({
                msg: "highlighted_line_number_too_big",
                msgParams: [String(end), String(lineCount), match[1]],
                type: ERROR
              });
            }
            if (end <= 0) {
              matches.push({
                msg: "highlighted_line_number_not_positive",
                msgParams: [String(end), match[1]],
                type: ERROR
              });
            }
            if (start > end) {
              matches.push({
                msg: "invalid_highlighted_range",
                msgParams: [String(start), String(end), match[1]],
                type: ERROR
              });
            }
          }
        });
      }
    }

    return matches;
  }
};