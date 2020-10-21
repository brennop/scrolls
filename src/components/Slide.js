import React, { useEffect, useRef } from "react";
import Markdown from "markdown-it";
import emoji from "markdown-it-emoji";
import attrs from "markdown-it-attrs";
import twemoji from "twemoji";
import styled from "@emotion/styled";

const md = new Markdown();
md.use(emoji);
md.use(attrs);

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
