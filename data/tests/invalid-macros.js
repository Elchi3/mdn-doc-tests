docTests.invalidMacros = {
  name: "invalid_macros",
  desc: "invalid_macros_desc",
  check: function checkInvalidMacros(rootElement) {
    const allowedMacros = [
      "apiref",
      "bug",
      "canvassidebar",
      "compatandroid",
      "compatchrome",
      "compatchromemobile",
      "compatgeckodesktop",
      "compatgeckofxos",
      "compatgeckomobile",
      "compatibilitytable",
      "compatie",
      "compatnightly",
      "compatno",
      "compatopera",
      "compatoperamobile",
      "compatsafari",
      "compatunknown",
      "compatversionunknown",
      "cssdata",
      "cssinfo",
      "cssref",
      "csssyntax",
      "cssxref",
      "defaultapisidebar",
      "deprecated_header",
      "deprecated_inline",
      "docstatus",
      "domxref",
      "embedlivesample",
      "event",
      "experimental_inline",
      "gecko",
      "geckorelease",
      "glossary",
      "groupdata",
      "htmlattrdef",
      "htmlattrxref",
      "htmlelement",
      "interface",
      "interfacedata",
      "jsref",
      "jssidebar",
      "jsxref",
      "l10n:common",
      "l10n:compattable",
      "l10n:css",
      "l10n:javascript",
      "l10n:svg",
      "next",
      "non-standard_header",
      "non-standard_inline",
      "obsolete_inline",
      "page",
      "previous",
      "previousnext",
      "promote-mdn",
      "property_prefix",
      "readonlyinline",
      "releasegecko",
      "seecompattable",
      "sidebarutilities",
      "spec2",
      "specname",
      "svgdata",
      "webextensionsidebar",
      "xref",
      "xulattr",
      "xulelem"
    ];

    var treeWalker = document.createTreeWalker(
        rootElement,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            return node.textContent.match(/\{\{.*?\}\}/) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          }
        }
    );
    var matches = [];

    while(treeWalker.nextNode()) {
      var reMacroName = /\{\{\s*([^\(\}\s]+).*?\}\}/g;
      var macroNameMatch = reMacroName.exec(treeWalker.currentNode.textContent);
      while (macroNameMatch) {
        if (allowedMacros.indexOf(macroNameMatch[1].toLowerCase()) === -1) {
          matches.push({
            msg: macroNameMatch[0]
          });
        }
        macroNameMatch = reMacroName.exec(treeWalker.currentNode.textContent);
      }
    }

    return matches;
  },
  type: WARNING,
  errors: []
};