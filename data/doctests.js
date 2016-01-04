const ERROR = 1;
const WARNING = 2;

var docTests = [
  {
    id: "oldURLs",
    name: "Old 'en/' URLs",
    desc: "en/ -> /en-US/docs/",
    regex: /\shref=\"\/en\/.*?"/gi,
    type: ERROR, 
    errors: []
  },
  {
    id: "emptyElem",
    name: "Empty elements",
    desc: "E.g. <p></p>",
    check: function check(content) {
      var matches = content.match(/<[^\/][^>]*?>([\s\r\n]|&nbsp;|<br\/?>)*<\/.*?>/gi) || [];
      for (var i = matches.length - 1; i >= 0; i--) {
        if (matches[i].match(/^<(?:link|track|param|area|command|col|base|meta|hr|source|img|keygen|br|wbr|input)/)) {
          matches.splice(i, 1);
        }
      }

      return matches;
    },
    type: ERROR, 
    errors: []
  },
  {
    id: "languagesMacro",
    name: "Languages macro",
    desc: "{{languages()}}",
    regex: /\{\{\s*languages.*?\}\}/gi,
    type: ERROR, 
    errors: []
  },
  {
    id: "emptyBrackets",
    name: "Empty brackets",
    desc: "{{foo()}}",
    regex: /\{\{\s*[a-z]*\(\)\s*?\}\}/gi,
    type: ERROR, 
    errors: []
  },
  {
    id: "styleAttribute",
    name: "Style attributes",
    desc: "style=",
    regex: /style=["'][a-zA-Z0-9:#!%;'\.\s\(\)\-\,]*['"]/gi,
    type: ERROR, 
    errors: []
  },
  {
    id: "nameAttribute",
    name: "Name attributes",
    desc: "name=",
    regex: /name=["'][a-zA-Z0-9:#!%;'_\.\s\(\)\-\,]*['"]/gi,
    type: ERROR, 
    errors: []
  },
  {
    id: "spanCount",
    name: "# of &lt;span&gt; elements",
    desc: "<span></span>",
    check: function check(content) {
      var matches = content.match(/<span.*?>.*?<\/span>/gi) || [];
      for (var i = 0; i < matches.length; i++) {
        if (matches[i].match(/<span[^>]*?class="seoSummary"/)) {
          matches.splice(i, 1);
        }
      }

      return matches;
    },
    type: ERROR, 
    errors: []
  },
  {
    id: "preWithoutClass",
    name: "&lt;pre&gt; w/o class",
    desc: "<pre></pre> (no syntax highlighter)",
    regex: /(<pre(?=\s|>)(?!(?:[^>=]|=(['"])(?:(?!\1).)*\1)*?class=['"])[^>]*>[\S\s]*?<\/pre>)/gi,
    type: ERROR, 
    errors: []
  },
  {
    id: "SummaryHeading",
    name: "Summary heading",
    desc: "According to the article style guide there shouldn't be a <hx>Summary</hx> heading.",
    regex: /<h[0-6]?(?!\/)[^>]+>Summary<\/h[0-6]>/gi,
    type: ERROR, 
    errors: []
  },
  {
    id: "jsRefWithParams",
    name: "JSRef params",
    desc: "Paremeters are obsolete now, e.g. {{JSRef('Global_Objects', 'Math')}}",
    regex: /\{\{s*JSRef\(.*?\}\}/gi,
    type: ERROR, 
    errors: []
  },
  {
    id: "ExampleColonHeading",
    name: "'Example:' heading",
    desc: "<h3>Example: Foobar</h3> just use <h3>Foobar</h3>",
    regex: /<h[0-6]?(?!\/)[^>]+>Example:.*?<\/h[0-6]>/gi,
    type: ERROR, 
    errors: []
  },
  {
    id: "alertPrintInCode",
    name: "alert, print, eval, d.write",
    desc: "Don't use alert(), print(), eval() or document.write() in code samples",
    check: function check(content) {
      var codeSamples = content.match(/<pre(?:\s.*)?>(?:.|\n)*?<\/pre>/gi) || [];
      var matches = [];
      for (var i = 0; i < codeSamples.length; i++) {
        var codeSampleMatches = codeSamples[i].match(/(?:alert|print|eval|document\.write)\s*\((?:.|\n)+?\)/gi);
        if (codeSampleMatches) {
          matches = matches.concat(codeSampleMatches);
        }
      }

      return matches;
    },
    type: ERROR, 
    errors: []
  },
  {
    id: "htmlComments",
    name: "HTML comments",
    desc: "HTML comments are not visible in wysiwyg mode and in reading mode. Not meant to comment the documentation",
    regex: /<!--[\s\S]*?-->/gi,
    type: ERROR, 
    errors: []
  },
  {
    id: "fontElement",
    name: "&lt;font&gt; element",
    desc: "Using <font> elements is obsolete. Either the tag should be removed completely or replaced by CSS.",
    regex: /<font.*?>/gi,
    type: ERROR, 
    errors: []
  },
  {
    id: "httpLinks",
    name: "HTTP links",
    desc: "URLs to external resources should use HTTPS when possible",
    regex: /<a[^>]+href="http:\/\//gi,
    type: WARNING, 
    errors: []
  },
  {
    id: "macroSyntaxError",
    name: "Macro syntax error",
    desc: "A macro has a syntax error like a missing closing bracket, e.g. {{jsxref(\"Array\"}}.",
    check: function macroSyntaxErrorCheck(content) {
      function validateStringParams(macro) {
        var paramListStartIndex = macro.indexOf("(") + 1;
        var paramListEndMatch = macro.match(/\)*\}{1,2}$/);
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
      var errors = [];
      macros.forEach(macro => {
        if (macro.match(/[^\}]\}$/)) {
          errors.push("Macro is missing a closing curly brace: " + macro);
        }
        if (macro.match(/^\{\{[^\(]+\([^\)]*\}\}$/)) {
          errors.push("Parameters list is missing a closing bracket: " + macro);
        }
        if (!validateStringParams(macro)) {
          errors.push("String parameter is not quoted correctly: " + macro);
        }
        if (macro.match(/\){2,}\}{1,2}$/)) {
          errors.push("Macro has additional closing bracket(s): " + macro);
        }
      });

      return errors;
    },
    type: ERROR,
    errors: []
  },
  {
    id: "wrongHighlightedLine",
    name: "Wrong highlighted line",
    desc: "A code block has a line highlighted that is outside the range of lines of code.",
    check: function checkWrongHighlightedLine(content) {
      var reCodeSample = /<pre(?:\s[^>]*class="[^"]*?highlight\[(-?\d+)\][^"]*?")>((?:.|\n)*?)<\/pre>/gi;
      var errors = [];
      var match = null;
      while (match = reCodeSample.exec(content)) {
        console.log(match);
        var highlightedLineNumber = Number(match[1]);
        if (highlightedLineNumber <= 0) {
          errors.push("Highlighted line number must be positive.");
        }

        var lineBreaks = match[2].match(/<br\s*\/?>|\n/gi);
        if (lineBreaks) {
          var lineCount = lineBreaks.length + 1;
          if (highlightedLineNumber > lineCount) {
            errors.push("Highlighted line number " + highlightedLineNumber +
                " exceeds the line count of " + lineCount);
          }
        }
      }

      return errors;
    },
    type: ERROR,
    count: 0
  }
];