import React from 'react';
import unified from 'unified';
import markdown from 'remark-parse';
import md2react from 'remark-react';
import gfm from 'remark-gfm';
import emoji from 'remark-emoji';
import sectionize from 'remark-sectionize';
import embedder from '@remark-embedder/core';
import highlight from 'remark-highlight.js';
import transformers from './transformers';
import Embed from '../components/Embed';

const processor = unified()
  .use(markdown)
  .use(gfm)
  .use(emoji)
  .use(embedder, { transformers })
  .use(sectionize)
  .use(highlight, { include: ['js', 'ts', 'jsx', 'md', 'bash', 'diff', 'css', 'sh'] })
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

export const toHTML = (data: string) => processor().process(data);
