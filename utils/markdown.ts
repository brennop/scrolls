import unified from "unified";
import markdown from "remark-parse";
import md2html from "remark-rehype";
import html from "rehype-stringify";
import gfm from "remark-gfm";
import emoji from "remark-emoji";

const processor = unified()
  .use(markdown)
  .use(gfm)
  .use(emoji)
  .use(md2html)
  .use(html);

export const toHTML = (data: string) =>
  processor().processSync(data).toString();
