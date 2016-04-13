docTests.invalidMacros = {
  name: "invalid_macros",
  desc: "invalid_macros_desc",
  check: function checkInvalidMacros(rootElement) {
    const allowedMacros = [
      "addonsidebar",
      "apiref",
      "availableinworkers",
      "bug",
      "canvassidebar",
      "communitybox",
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
      "discussionlist",
      "docstatus",
      "domxref",
      "draft",
      "embedlivesample",
      "embedyoutube",
      "event",
      "experimental_inline",
      "fx_minversion_inline",
      "fxos_maxversion_inline",
      "fxos_minversion_inline",
      "gecko",
      "gecko_minversion_inline",
      "geckorelease",
      "glossary",
      "groupdata",
      "htmlattrdef",
      "htmlattrxref",
      "htmlelement",
      "htmlref",
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
      "mathmlelement",
      "next",
      "non-standard_header",
      "non-standard_inline",
      "noscript_inline",
      "obsolete_inline",
      "optional_inline",
      "page",
      "previous",
      "previousnext",
      "promote-mdn",
      "property_prefix",
      "readonlyinline",
      "releasegecko",
      "seecompattable",
      "sidebarutilities",
      "sm_minversion_inline",
      "spec2",
      "specname",
      "svgattr",
      "svgdata",
      "svgelement",
      "svginfo",
      "svgref",
      "tb_minversion_inline",
      "webextapiembedtype",
      "webextapiref",
      "webextapisidebar",
      "webextchromecompat",
      "webextexamplesdata",
      "webextexamples",
      "webrtcsidebar",
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
