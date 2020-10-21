import React, { useEffect, useRef } from "react";
import twemoji from "twemoji";
import styled from "@emotion/styled";

import Markdown from "markdown-it";
import emoji from "markdown-it-emoji";
import attrs from "markdown-it-attrs";
import mila from "markdown-it-link-attributes";

const md = new Markdown({ linkify: true });
md.use(emoji);
md.use(attrs);
md.use(mila, {
  attrs: {
    target: "_blank",
    rel: "noopener noreferer",
  },
});

md.renderer.rules.emoji = function (token, idx) {
  return twemoji.parse(token[idx].content);
};

const Wrapper = styled.section`
  display: flex;
  align-items: center;
`;

const InnerDiv = styled.div`
  flex: 1;
`;

const Slide = ({ value }) => {
  const section = useRef();

  useEffect(() => {
    section.current.scrollIntoView({ behavior: "smooth" });
  }, [section, value]);

  return (
    <Wrapper ref={section}>
      <InnerDiv
        dangerouslySetInnerHTML={{ __html: md.render(value) }}
      ></InnerDiv>
    </Wrapper>
  );
};

export default Slide;
