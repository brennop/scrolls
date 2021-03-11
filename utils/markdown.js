import twemoji from "twemoji";

import Markdown from "markdown-it";
import emoji from "markdown-it-emoji";
import attrs from "markdown-it-attrs";
import mila from "markdown-it-link-attributes";

import {
  highlight,
  languages,
  highlightAll,
} from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-markdown";

import "prismjs/themes/prism-tomorrow.css";

export const md = new Markdown({
  linkify: true,
  highlight: (code, lang) => {
    if (lang) {
      if (languages[lang]) {
        try {
          return highlight(code, languages[lang]);
        } catch (e) {
          console.log(e);
        }
      } else {
        import("prismjs/components/prism-" + lang)
          .then(() => highlightAll())
          .catch((error) => console.log(error));
      }
    }
  },
});

// plugins
md.use(emoji);
md.use(attrs);
md.use(mila, {
  attrs: {
    target: "_blank",
    rel: "noopener noreferer",
  },
});

// twitter emojis
md.renderer.rules.emoji = function (token, idx) {
  return twemoji.parse(token[idx].content);
};
