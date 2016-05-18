docTests.shellPrompts = {
  name: "shell_prompts",
  desc: "shell_prompts_desc",
  check: function checkShellPrompts(rootElement) {
    let pres = rootElement.querySelectorAll("pre");
    let matches = [];

    for (let i = 0; i < pres.length; i++) {
      let code = pres[i].innerHTML.replace(/<br\/?>/g, "\n").replace("&nbsp;", " ");
      let shellPrompts = code.match(/^(?:\$|&gt;).*/gm);
      if (shellPrompts) {
        shellPrompts.forEach(function addMatch(shellPrompt) {
          matches.push({
            msg: shellPrompt.replace(/<.+?>/g, ""),
            type: ERROR
          });
        });
      }
    }

    return matches;
  }
};