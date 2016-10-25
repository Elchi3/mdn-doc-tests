/*
 *  Title: Test whether code blocks unexpectedly contain <code> elements, which break the syntax
 *  highlighting.
 *
 *  Example 1: <pre class="brush:js"><code>var x = 1;</code></pre> is considered invalid and 
 *  should rather be written as <pre class="brush:js">var x = 1;</pre>.
 * 
 *  Implementation notes: This test checks whether <pre> elements contain <code> elements.
 */

docTests.codeInPre = {
  name: "code_in_pre",
  desc: "code_in_pre_desc",
  check: function checkCodeInPre(rootElement) {
    let codesInPres = rootElement.querySelectorAll("pre code");
    let matches = [];

    for (let i = 0; i < codesInPres.length; i++) {
      matches.push({
        msg: codesInPres[i].outerHTML,
        type: ERROR
      });
    }

    return matches;
  }
};