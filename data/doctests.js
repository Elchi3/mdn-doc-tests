const ERROR = 1;
const WARNING = 2;

function mapMatches(matches) {
  return matches.map(match => {
    return {msg: match};
  });
}

var docTests = {
  "oldURLs": {
    name: "old_en_urls",
    desc: "old_en_urls_desc",
    check: function checkOldURLs(content) {
      var matches = content.match(/\shref=\"\/en\/.*?"/gi) || [];
      return mapMatches(matches);
    },
    type: ERROR,
    errors: []
  },

  "emptyElements": {
    name: "empty_elements",
    desc: "empty_elements_desc",
    check: function checkEmptyElements(content) {
      var matches = content.match(/<[^\/][^>]*?>([\s\r\n]|&nbsp;|<br\/?>)*<\/.*?>/gi) || [];
      for (var i = matches.length - 1; i >= 0; i--) {
        if (matches[i].match(/^<(?:link|track|param|area|command|col|base|meta|hr|source|img|keygen|br|wbr|input)/)) {
          matches.splice(i, 1);
        }
      }

      return mapMatches(matches);
    },
    type: ERROR,
    errors: []
  },

  "languagesMacro": {
    name: "languages_macro",
    desc: "languages_macro_desc",
    check: function checkLanguagesMacro(content) {
      var matches = content.match(/\{\{\s*languages.*?\}\}/gi) || [];
      return mapMatches(matches);
    },
    type: ERROR,
    errors: []
  },

  "emptyBrackets": {
    name: "empty_brackets",
    desc: "empty_brackets_desc",
    check: function checkEmptyBrackets(content) {
      var matches = content.match(/\{\{\s*[a-z]*\(\)\s*?\}\}/gi) || [];
      return mapMatches(matches);
    },
    type: ERROR,
    errors: []
  },

  "styleAttribute": {
    name: "style_attributes",
    desc: "style_attributes_desc",
    check: function checkStyleAttribute(content) {
      var matches = content.match(/style=["'][a-zA-Z0-9:#!%;'\.\s\(\)\-\,]*['"]/gi) || [];
      return mapMatches(matches);
    },
    type: ERROR,
    errors: []
  },

  "nameAttribute": {
    name: "name_attributes",
    desc: "name_attributes_desc",
    check: function checkNameAttribute(content) {
      var matches = content.match(/name=["'][a-zA-Z0-9:#!%;'_\.\s\(\)\-\,]*['"]/gi) || [];
      return mapMatches(matches);
    },
    type: ERROR,
    errors: []
  },

  "spanCount": {
    name: "span_elements",
    desc: "span_elements_desc",
    check: function checkSpanCount(content) {
      var matches = content.match(/<span.*?>.*?<\/span>/gi) || [];
      for (var i = 0; i < matches.length; i++) {
        if (matches[i].match(/<span[^>]*?class="seoSummary"/)) {
          matches.splice(i, 1);
        }
      }

      return matches.map(match => {
        return {msg: match};
      });
    },
    type: ERROR,
    errors: []
  },

  "preWithoutClass": {
    name: "pre_without_class",
    desc: "pre_without_class_desc",
    check: function checkPreWithoutClass(content) {
      var rePre = /<pre.*?>((?:.|[\r\n])*?)<\/pre>/gi;
      var matches = [];
      var match = rePre.exec(content);
      while (match) {
        if (!match[0].match(/^<pre[^>]*class=["'][^"']/)) {
          matches = matches.concat(match[0]);
        }

        match = rePre.exec(content);
      }

      return mapMatches(matches);
    },
    type: ERROR,
    errors: []
  },

  "summaryHeading": {
    name: "summary_heading",
    desc: "summary_heading_desc",
    check: function checkSummaryHeading(content) {
      var matches = content.match(/<h[0-6]?(?!\/)[^>]+>Summary<\/h[0-6]>/gi) || [];
      return mapMatches(matches);
    },
    type: ERROR,
    errors: []
  },

  "jsRefWithParams": {
    name: "jsref_params",
    desc: "jsref_params_desc",
    check: function checkJSRefWithParams(content) {
      var matches = content.match(/\{\{s*JSRef\(.*?\}\}/gi) || [];
      return mapMatches(matches);
    },
    type: ERROR,
    errors: []
  },

  "exampleColonHeading": {
    name: "example_headings",
    desc: "example_headings_desc",
    check: function checkExampleColonHeading(content) {
      var matches = content.match(/<h[0-6]?(?!\/)[^>]+>Example:.*?<\/h[0-6]>/gi) || [];
      return mapMatches(matches);
    },
    type: ERROR,
    errors: []
  },

  "alertPrintInCode": {
    name: "alert_print_in_code",
    desc: "alert_print_in_code_desc",
    check: function checkAlertPrintInCode(content) {
      var codeSamples = content.match(/<pre(?:\s.*)?>(?:.|\n)*?<\/pre>/gi) || [];
      var matches = [];
      for (var i = 0; i < codeSamples.length; i++) {
        var codeSampleMatches = codeSamples[i].match(/(?:alert|print|eval|document\.write)\s*\((?:.|\n)+?\)/gi);
        if (codeSampleMatches) {
          matches = matches.concat(codeSampleMatches);
        }
      }

      return matches.map(match => {
        return {msg: match};
      });
    },
    type: ERROR,
    errors: []
  },

  "htmlComments": {
    name: "html_comments",
    desc: "html_comments_desc",
    check: function checkHTMLComments(content) {
      var matches = content.match(/<!--[\s\S]*?-->/gi) || [];
      return mapMatches(matches);
    },
    type: ERROR,
    errors: []
  },

  "fontElements": {
    name: "font_elements",
    desc: "font_elements_desc",
    check: function checkFontElements(content) {
      var matches = content.match(/<font.*?>/gi) || [];
      return mapMatches(matches);
    },
    type: ERROR,
    errors: []
  },

  "httpLinks": {
    name: "http_links",
    desc: "http_links_desc",
    check: function checkHTTPLinks(content) {
      var matches = content.match(/<a[^>]+href="http:\/\//gi) || [];
      return mapMatches(matches);
    },
    type: WARNING,
    errors: []
  },

  "macroSyntaxError": {
    name: "macro_syntax_error",
    desc: "macro_syntax_error_desc",
    check: function checkMacroSyntaxError(content) {
      function validateStringParams(macro) {
        var paramListStartIndex = macro.indexOf("(") + 1;
        var paramListEndMatch = macro.match(/\)*\s*\}{1,2}$/);
        var paramListEndIndex = macro.length - paramListEndMatch[0].length;
        var stringParamQuote = "";
        for (var i = paramListStartIndex; i < paramListEndIndex; i++) {
          if (macro[i] === "\"") {
            if (stringParamQuote === "") {
              stringParamQuote = "\"";
            } else if (stringParamQuote === "\"" && macro[i - 1] !== "\\") {
              stringParamQuote = "";
            }
          } else if (macro[i] === "'") {
            if (stringParamQuote === "") {
              stringParamQuote = "'";
            } else if (stringParamQuote === "'" && macro[i - 1] !== "\\") {
              stringParamQuote = "";
            }
          } else if (stringParamQuote === "" && macro[i].match(/[^\s,\d\-\.]/)) {
            return false;
          }
        }
        return stringParamQuote === "";
      }

      var macros = content.match(/\{\{[^\(\}]*\([^\}]*\}\}|\{\{[^\}]*?\}(?=[^\}])/gi) || [];
      var matches = [];
      macros.forEach(macro => {
        if (macro.match(/[^\}]\}$/)) {
          matches.push({
            msg: "missing_closing_curly_brace",
            msgParams: [macro]
          });
        }
        if (macro.match(/^\{\{[^\(]+\([^\)]*\}\}$/)) {
          matches.push({
            msg: "missing_closing_bracket",
            msgParams: [macro]
          });
        }
        if (!validateStringParams(macro)) {
          matches.push({
            msg: "string_parameter_incorrectly_quoted",
            msgParams: [macro]
          });
        }
        if (macro.match(/\){2,}\}{1,2}$/)) {
          matches.push({
            msg: "additional_closing_bracket",
            msgParams: [macro]
          });
        }
      });
      return matches;
    },
    type: ERROR,
    errors: []
  },

  "wrongHighlightedLine": {
    name: "wrong_highlighted_line",
    desc: "wrong_highlighted_line_desc",
    check: function checkWrongHighlightedLine(content) {
      var reCodeSample = /<pre(?:\s[^>]*class="[^"]*?highlight:?\s*\[(.+?)\][^"]*?")>((?:.|\n)*?)<\/pre>/gi;
      var matches = [];
      var match = reCodeSample.exec(content);
      while (match) {
        var numbersAndRanges = match[1].split(",");
        var lineCount = match[2].split(/<br\s*\/?>|\n/gi).length;
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
              msgParams: [String(start), match[1]]
            });
          }
          if (start > lineCount) {
            matches.push({
              msg: "highlighted_line_number_too_big",
              msgParams: [String(start), String(lineCount), match[1]]
            });
          }
          if (!Number.isNaN(end)) {
            if (end > lineCount) {
              matches.push({
                msg: "highlighted_line_number_too_big",
                msgParams: [String(end), String(lineCount), match[1]]
              });
            }
            if (end <= 0) {
              matches.push({
                msg: "highlighted_line_number_not_positive",
                msgParams: [String(end), match[1]]
              });
            }
            if (start > end) {
              matches.push({
                msg: "invalid_highlighted_range",
                msgParams: [String(start), String(end), match[1]]
              });
            }
          }
        });

        match = reCodeSample.exec(content);
      }
      return matches;
    },
    type: ERROR,
    count: 0
  },

  "apiSyntaxHeadlines": {
    name: "api_syntax_headlines",
    desc: "api_syntax_headlines_desc",
    check: function checkAPISyntaxHeadlines(content) {
      const disallowedNames = new Set(["returns", "errors", "errors thrown"]);
      const validOrder = [
        new Set(["parameters"]),
        new Set(["return value", "returns"]),
        new Set(["exceptions", "errors", "errors thrown"])
      ];
      var syntaxSection = content.match(/<h2.*?>Syntax<\/h2>((?:.|\n)*?)(?:<h2|$)/i) || [];
      var order = [];
      var matches = [];
      if (syntaxSection.length === 2) {
        var subHeadings = [];
        var reSubHeadings = /<h3.*?>(.*?)<\/h3>/gi;
        var match = reSubHeadings.exec(syntaxSection[1]);
        while (match) {
          subHeadings.push(match[1]);
          match = reSubHeadings.exec(syntaxSection[1]);
        }
        for (var i = 0; i < subHeadings.length; i++) {
          // While editing it happens that there are <br>s added to the headings
          var subHeading = subHeadings[i].replace(/<br\/?>/g, "");
          for (var j = 0; j < validOrder.length; j++) {
            var heading = validOrder[j];
            if (heading.has(subHeading.toLowerCase())) {
              order.push(j);
            }
          }
          if (disallowedNames.has(subHeading.toLowerCase())) {
            matches.push({
              msg: "invalid_headline_name",
              msgParams: [subHeadings[i]]
            });
          }
        }
        for (var i = 1; i < order.length; i++) {
          if (order[i] < order[i - 1]) {
            matches.push({
              msg: "invalid_headline_order"
            });
          }
        }
      }

      return matches;
    },
    type: ERROR,
    count: 0
  },

  "codeInPre": {
    name: "code_in_pre",
    desc: "code_in_pre_desc",
    check: function checkCodeInPre(content) {
      var rePre = /<pre.*?>((?:.|\n)*?)<\/pre>/gi;
      var matches = [];
      var match = rePre.exec(content);
      while (match) {
        var codeBlocks = match[1].match(/<code.*?>(?:.|\n)*?<\/code>/gi);
        if (codeBlocks) {
          matches = matches.concat(codeBlocks);
        }

        match = rePre.exec(content);
      }

      return mapMatches(matches);
    },
    type: ERROR,
    count: 0
  },

  "lineLengthInPre": {
    name: "pre_line_too_long",
    desc: "pre_line_too_long_desc",
    check: function checkLineLengthInPre(content) {
      var rePre = /<pre.*?>((?:.|\n)*?)<\/pre>/gi;
      var matches = [];
      var match = rePre.exec(content);
      while (match) {
        // While editing it happens that there are <br>s added instead of line break characters
        // Those need to be replaced by line breaks to correctly recognize long lines
        var codeBlock = match[1].replace(/<br\/?>/g, "\n");
        var longLines = codeBlock.match(/^(?:[^\r\n]|\r(?!\n)){78,}$/gm);
        if (longLines) {
          matches = matches.concat(longLines);
        }
        match = rePre.exec(content);
      }

      return mapMatches(matches);
    },
    type: WARNING,
    count: 0
  }
};