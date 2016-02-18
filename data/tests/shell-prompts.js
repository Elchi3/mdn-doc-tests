docTests.shellPrompts = {
  name: "shell_prompts",
  desc: "shell_prompts_desc",
  check: function checkShellPrompts(rootElement) {
    var pres = rootElement.querySelectorAll("pre");
    var matches = [];

    for (var i = 0; i < pres.length; i++) {
      var code = pres[i].innerHTML.replace(/<br\/?>/g, "\n").replace("&nbsp;", " ");
      var shellPrompts = code.match(/^(?:\$|&gt;).*/gm);
      if (shellPrompts) {
        shellPrompts.forEach(function addMatch(shellPrompt) {
          matches.push({
            msg: shellPrompt.replace(/<.+?>/g, "")
          });
        });
      }
    }

    return matches;
  },
  type: ERROR,
  count: 0
};