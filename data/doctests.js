[

{
  "id": "oldURLs",
  "name": "Old 'en/' URLs",
  "desc": "en/ -> /en-US/docs/",
  "regex": "\\shref=\"\\/*en*\/",
  "count": 0
},

{
  "id": "emptyElem",
  "name": "Empty elements",
  "desc": "E.g. <p></p>",
  "regex": "(<(?!\\/)[^>]+>)+([\\s]*?)(<\\/[^>]+>)+",
  "count": 0
},

{
  "id": "languagesMacro",
  "name": "Languages macro",
  "desc": "{{languages()}}",
  "regex": "{{\\s*languages\\s*",
  "count": 0
},


{
  "id": "emptyBrackets",
  "name": "Empty brackets",
  "desc": "{{foo()}}",
  "regex": "{{\\s*[a-z]*\\(\\)\\s*}}",
  "count": 0
},

{
  "id": "styleAttribute",
  "name": "Style attributes",
  "desc": "style=",
  "regex": "style=[\"'][a-zA-Z0-9:#!%;'\\.\\s\\(\\)\\-\\,]*['\"]",
  "count": 0
},

{
  "id": "spanCount",
  "name": "# of &lt;span&gt; elements",
  "desc": "<span></span>",
  "regex": "(<span[^>]*>).*?<\\/span>",
  "count": 0
},

{
  "id": "preWithoutClass",
  "name": "&lt;pre&gt; w/o class",
  "desc": "<pre></pre> (no syntax highlighter)",
  "regex": "(<pre(?=\\s|>)(?!(?:[^>=]|=(['\"])(?:(?!\\1).)*\\1)*?class=['\"])[^>]*>[\\S\\s]*?<\\/pre>)",
  "count": 0
}

]