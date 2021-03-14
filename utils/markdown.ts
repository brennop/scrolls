import React from 'react';
import unified from 'unified';
import markdown from 'remark-parse';
import md2react from 'remark-react';
import gfm from 'remark-gfm';
import emoji from 'remark-emoji';
import sectionize from 'remark-sectionize';
import embedder from '@remark-embedder/core';
import transformers from './transformers';
import Embed from '../components/Embed';
import directive from 'remark-directive';
import visit from 'unist-util-visit';
import h from 'hastscript';

const processor = unified()
  .use(markdown)
  .use(gfm)
  .use(emoji)
  .use(embedder, { transformers })
  .use(sectionize)
  .use(directive)
  .use(htmlDirectives)
  .use(md2react, {
    sanitize: false,
    // eslint-disable-next-line react/display-name
    createElement: (type, props, children) => {
      if (type?.name === 'Embed') {
        props.key = props.src;
      }
      return React.createElement(type, props, children);
    },
    remarkReactComponents: {
      iframe: Embed,
    },
  });

// This plugin is just an example! You can handle directives however you please!
function htmlDirectives() {
  return transform;

  function transform(tree) {
    visit(tree, ['textDirective', 'leafDirective', 'containerDirective'], ondirective);
  }

  function ondirective(node) {
    const data = node.data || (node.data = {});
    const hast = h(node.name, node.attributes);

    data.hName = hast.tagName;
    data.hProperties = hast.properties;
  }
}

export const toHTML = (data: string) => processor().process(data);
