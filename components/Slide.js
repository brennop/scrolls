import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { md } from "../utils/markdown";

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
