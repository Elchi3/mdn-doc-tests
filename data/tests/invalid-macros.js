docTests.invalidMacros = {
  name: "invalid_macros",
  desc: "invalid_macros_desc",
  check: function checkInvalidMacros(rootElement) {
    const allowedMacros = [
      "addonsidebar",
      "apiref",
      "anch",
      "availableinworkers",
      "bug",
      "canvassidebar",
      "chromebug",
      "communitybox",
      "compat",
      "compatandroid",
      "compatchrome",
      "compatchromemobile",
      "compatedge",
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
      "compatwebkit",
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
      "edgebug",
      "embedghlivesample",
      "embedlivesample",
      "embedyoutube",
      "event",
      "experimental_inline",
      "firefox_for_developers",
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
      "httpheader",
      "httpmethod",
      "httpsidebar",
      "httpstatus",
      "includesubnav",
      "inheritancediagram",
      "interface",
      "interfacedata",
      "jsfiddlelink",
      "jsref",
      "jssidebar",
      "jsxref",
      "l10n:common",
      "l10n:compattable",
      "l10n:css",
      "l10n:javascript",
      "l10n:svg",
      "localizationstatusinsection",
      "mathmlelement",
      "mathmlref",
      "next",
      "non-standard_header",
      "non-standard_inline",
      "noscript_inline",
      "obsolete_header",
      "obsolete_inline",
      "optional_inline",
      "page",
      "previous",
      "previousmenunext",
      "previousnext",
      "promote-mdn",
      "property_prefix",
      "readonlyinline",
      "releasegecko",
      "rfc",
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
      "webglsidebar",
      "webkitbug",
      "webrtcsidebar",
      "xref",
      "xulattr",
      "xulelem"
    ];

    let treeWalker = document.createTreeWalker(
        rootElement,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            return node.textContent.match(/\{\{.*?\}\}/) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          }
        }
    );
    let matches = [];

    while(treeWalker.nextNode()) {
      let reMacroName = /\{\{\s*([^\(\}\s]+).*?\}\}/g;
      let macroNameMatch = reMacroName.exec(treeWalker.currentNode.textContent);
      while (macroNameMatch) {
        if (allowedMacros.indexOf(macroNameMatch[1].toLowerCase()) === -1) {
          matches.push({
            msg: macroNameMatch[0],
            type: WARNING
          });
        }
        macroNameMatch = reMacroName.exec(treeWalker.currentNode.textContent);
      }
    }

    return matches;
  }
};
