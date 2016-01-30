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
    check: function checkOldURLs(rootElement) {
      var links = rootElement.querySelectorAll("a[href]");
      var matches = [];

      for (var i = 0; i < links.length; i++) {
        // This check can be removed once querySelectorAll supports case-insensitive search, i.e. a[href^='/en/' i]
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
  },

  "emptyElements": {
    name: "empty_elements",
    desc: "empty_elements_desc",
    check: function checkEmptyElements(rootElement) {
      var treeWalker = document.createTreeWalker(
          rootElement,
          NodeFilter.SHOW_ELEMENT,
          {
            acceptNode: (node) => {
              //alert(node.localName + ", " + node.textContent + ", " + node.localName.match(/^(?:link|track|param|area|command|col|base|meta|hr|source|img|keygen|br|wbr|input)$/i));
              return !node.localName.match(/^(?:link|track|param|area|command|col|base|meta|hr|source|img|keygen|br|wbr|input)$/i) &&
                  node.textContent.match(/^(?:&nbsp;|\s|\n)*$/) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_CANCEL;
            }
          }
      );
      var matches = [];

      while(treeWalker.nextNode()) {
        matches.push({
          msg: treeWalker.currentNode.outerHTML
        });
      }

      return matches;
    },
    type: ERROR,
    errors: []
  },

  "languagesMacro": {
    name: "languages_macro",
    desc: "languages_macro_desc",
    check: function checkLanguagesMacro(rootElement) {
      var treeWalker = document.createTreeWalker(
          rootElement,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode: (node) => {
              return node.textContent.match(/\{\{\s*languages.*?\}\}/i) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
          }
      );
      var matches = [];

      while(treeWalker.nextNode()) {
        var textNodeMatches = treeWalker.currentNode.textContent.match(/\{\{\s*languages.*?\}\}/gi);
        textNodeMatches.forEach(match => {
          matches.push({
            msg: match
          });
        });
      }

      return matches;
    },
    type: ERROR,
    errors: []
  },

  "emptyBrackets": {
    name: "empty_brackets",
    desc: "empty_brackets_desc",
    check: function checkEmptyBrackets(rootElement) {
      var treeWalker = document.createTreeWalker(
          rootElement,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode: (node) => {
              return node.textContent.match(/\{\{\s*[a-z]*\(\)\s*?\}\}/i) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
          }
      );
      var matches = [];

      while(treeWalker.nextNode()) {
        var textNodeMatches = treeWalker.currentNode.textContent.match(/\{\{\s*[a-z]*\(\)\s*?\}\}/gi) || [];
        textNodeMatches.forEach(match => {
          matches.push({
            msg: match
          });
        });
      }

      return matches;
    },
    type: ERROR,
    errors: []
  },

  "styleAttribute": {
    name: "style_attributes",
    desc: "style_attributes_desc",
    check: function checkStyleAttribute(rootElement) {
      var elementsWithStyleAttribute = rootElement.querySelectorAll("[style]");
      var matches = [];

      for (var i = 0; i < elementsWithStyleAttribute.length; i++) {
        matches.push({
          msg: 'style="' + elementsWithStyleAttribute[i].getAttribute("style") + '"'
        })
      }

      return matches;
    },
    type: ERROR,
    errors: []
  },

  "nameAttribute": {
    name: "name_attributes",
    desc: "name_attributes_desc",
    check: function checkNameAttribute(rootElement) {
      var elementsWithStyleAttribute = rootElement.querySelectorAll("[name]");
      var matches = [];

      for (var i = 0; i < elementsWithStyleAttribute.length; i++) {
        matches.push({
          msg: 'name="' + elementsWithStyleAttribute[i].getAttribute("name") + '"'
        })
      }

      return matches;
    },
    type: ERROR,
    errors: []
  },

  "spanCount": {
    name: "span_elements",
    desc: "span_elements_desc",
    check: function checkSpanCount(rootElement) {
      var spanElements = rootElement.querySelectorAll("span:not(.seoSummary)");
      var matches = [];

      for (var i = 0; i < spanElements.length; i++) {
        matches.push({
          msg: spanElements[i].outerHTML
        })
      }

      return matches;
    },
    type: ERROR,
    errors: []
  },

  "preWithoutClass": {
    name: "pre_without_class",
    desc: "pre_without_class_desc",
    check: function checkPreWithoutClass(rootElement) {
      var presWithoutClass = rootElement.querySelectorAll("pre:-moz-any(:not([class]), [class=''])");
      var matches = [];

      for (var i = 0; i < presWithoutClass.length; i++) {
        matches.push({
          msg: presWithoutClass[i].outerHTML
        })
      }

      return matches;
    },
    type: ERROR,
    errors: []
  },

  "summaryHeading": {
    name: "summary_heading",
    desc: "summary_heading_desc",
    check: function checkSummaryHeading(rootElement) {
      var headlines = rootElement.querySelectorAll("h1, h2, h3, h4, h5, h6");
      var matches = [];

      for (var i = 0; i < headlines.length; i++) {
        if (headlines[i].textContent.match(/^\s*Summary\s*$/)) {
          matches.push({
            msg: headlines[i].outerHTML
          })
        }
      }

      return matches;
    },
    type: ERROR,
    errors: []
  },

  "jsRefWithParams": {
    name: "jsref_params",
    desc: "jsref_params_desc",
    check: function checkJSRefWithParams(rootElement) {
      var treeWalker = document.createTreeWalker(
          rootElement,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode: (node) => {
              return node.textContent.match(/\{\{s*JSRef\(.*?\}\}/i) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
          }
      );
      var matches = [];

      while(treeWalker.nextNode()) {
        var textNodeMatches = treeWalker.currentNode.textContent.match(/\{\{s*JSRef\(.*?\}\}/gi) || [];
        textNodeMatches.forEach(match => {
          matches.push({
            msg: match
          });
        });
      }

      return matches;
    },
    type: ERROR,
    errors: []
  },

  "exampleColonHeading": {
    name: "example_headings",
    desc: "example_headings_desc",
    check: function checkExampleColonHeading(rootElement) {
      var headlines = rootElement.querySelectorAll("h1, h2, h3, h4, h5, h6");
      var matches = [];

      for (var i = 0; i < headlines.length; i++) {
        if (headlines[i].textContent.match(/^\s*Example:/)) {
          matches.push({
            msg: headlines[i].outerHTML
          })
        }
      }

      return matches;
    },
    type: ERROR,
    errors: []
  },

  "alertPrintInCode": {
    name: "alert_print_in_code",
    desc: "alert_print_in_code_desc",
    check: function checkAlertPrintInCode(rootElement) {
      var pres = rootElement.getElementsByTagName("pre");
      var matches = [];
      for (var i = 0; i < pres.length; i++) {
        var preMatches = pres[i].textContent.match(/(?:alert|print|eval|document\.write)\s*\((?:.|\n)+?\)/gi) || [];
        matches = matches.concat(mapMatches(preMatches));
      }

      return matches;
    },
    type: ERROR,
    errors: []
  },

  "htmlComments": {
    name: "html_comments",
    desc: "html_comments_desc",
    check: function checkHTMLComments(rootElement) {
      var treeWalker = document.createTreeWalker(
          rootElement,
          NodeFilter.SHOW_COMMENT
      );
      var matches = [];

      while(treeWalker.nextNode()) {
        matches.push({
          msg: "<!--" + treeWalker.currentNode.data + "-->"
        });
      }

      return matches;
    },
    type: ERROR,
    errors: []
  },

  "fontElements": {
    name: "font_elements",
    desc: "font_elements_desc",
    check: function checkFontElements(rootElement) {
      var fontElements = rootElement.getElementsByTagName("font");
      var matches = [];

      for (var i = 0; i < fontElements.length; i++) {
        matches.push({
          msg: fontElements[i].outerHTML
        })
      }

      return matches;
    },
    type: ERROR,
    errors: []
  },

  "httpLinks": {
    name: "http_links",
    desc: "http_links_desc",
    check: function checkHTTPLinks(rootElement) {
      var httpLinks = rootElement.querySelectorAll("a[href^='http://']");
      var matches = [];

      for (var i = 0; i < httpLinks.length; i++) {
        matches.push({
          msg: httpLinks[i].outerHTML
        })
      }

      return matches;
    },
    type: WARNING,
    errors: []
  },

  "macroSyntaxError": {
    name: "macro_syntax_error",
    desc: "macro_syntax_error_desc",
    check: function checkMacroSyntaxError(rootElement) {
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

      var treeWalker = document.createTreeWalker(
          rootElement,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode: (node) => {
              return node.textContent.match(/\{\{[^\(\}]*\([^\}]*\}\}|\{\{[^\}]*?\}(?:(?=[^\}])|$)/) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
          }
      );
      var matches = [];

      while(treeWalker.nextNode()) {
        var textNodeMatches = treeWalker.currentNode.textContent.match(/\{\{[^\(\}]*\([^\}]*\}\}|\{\{[^\}]*?\}(?:(?=[^\}])|$)/gi) || [];
        textNodeMatches.forEach(macro => {
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
      }

      return matches;
    },
    type: ERROR,
    errors: []
  },

  "wrongHighlightedLine": {
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
        }
      }

      return matches;
    },
    type: ERROR,
    count: 0
  },

  "apiSyntaxHeadlines": {
    name: "api_syntax_headlines",
    desc: "api_syntax_headlines_desc",
    check: function checkAPISyntaxHeadlines(rootElement) {
      const disallowedNames = new Set(["returns", "errors", "errors thrown"]);
      const validOrder = [
        new Set(["parameters"]),
        new Set(["return value", "returns"]),
        new Set(["exceptions", "errors", "errors thrown"])
      ];
      var headlines = rootElement.getElementsByTagName("h2");
      var syntaxSection = null;
      var order = [];
      var matches = [];
      for (var i = 0; !syntaxSection && i < headlines.length; i++) {
        if (headlines[i].textContent === "Syntax") {
          syntaxSection = headlines[i];
        }
      }

      if (syntaxSection) {
        var subHeadings = [];
        var element = syntaxSection.nextSibling;
        while (element && element.localName !== "h2") {
          if (element.localName === "h3") {
            subHeadings.push(element.textContent);
          }
          element = element.nextSibling;
        }
        for (var i = 0; i < subHeadings.length; i++) {
          var subHeading = subHeadings[i];
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

        // Check the order of the headlines
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

  "wrongSyntaxClass": {
    name: "wrong_syntax_class",
    desc: "wrong_syntax_class_desc",
    check: function checkWrongSyntaxClass(rootElement) {
      function checkPre(heading) {
        var element = heading.nextSibling;
        while (element && element.localName !== "h2") {
          if (element.localName === "pre" && element.className !== "syntaxbox") {
            return {
              msg: "wrong_syntax_class_used",
              msgParams: [element.className]
            };
            break;
          }
          element = element.nextElementSibling;
        }
      }

      var subHeadings = rootElement.getElementsByTagName("h3");
      var formalSyntaxSection = null;
      for (var i = 0; !formalSyntaxSection && i < subHeadings.length; i++) {
        if (subHeadings[i].textContent.match(/Formal syntax/i)) {
          formalSyntaxSection = subHeadings[i];
        }
      }

      var syntaxBoxClass;
      var matches = [];
      if (formalSyntaxSection) {
        var match = checkPre(formalSyntaxSection);
        if (match) {
          matches.push(match);
        }
      } else {
        var headings = rootElement.getElementsByTagName("h2");
        var syntaxSection = null;
        for (var i = 0; !syntaxSection && i < headings.length; i++) {
          if (headings[i].textContent.toLowerCase() === "syntax") {
            syntaxSection = headings[i];
          }
        }

        if (syntaxSection) {
          var match = checkPre(syntaxSection);
          if (match) {
            matches.push(match);
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
    check: function checkCodeInPre(rootElement) {
      var codesInPres = rootElement.querySelectorAll("pre code");
      var matches = [];

      for (var i = 0; i < codesInPres.length; i++) {
        matches.push({
          msg: codesInPres[i].outerHTML
        });
      }

      return matches;
    },
    type: ERROR,
    count: 0
  },

  "lineLengthInPre": {
    name: "pre_line_too_long",
    desc: "pre_line_too_long_desc",
    check: function checkLineLengthInPre(rootElement) {
      var pres = rootElement.getElementsByTagName("pre");
      var matches = [];

      for (var i = 0; i < pres.length; i++) {
        // While editing it happens that there are <br>s added instead of line break characters
        // Those need to be replaced by line breaks to correctly recognize long lines
        var codeBlock = pres[i].innerHTML.replace(/<br\/?>/g, "\n");
        var longLines = codeBlock.match(/^(?:[^\r\n]|\r(?!\n)){78,}$/gm);
        if (longLines) {
          matches = matches.concat(longLines);
        }
      }

      return mapMatches(matches);
    },
    type: WARNING,
    count: 0
  }
};