import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { toHTML } from '../utils/markdown';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
`;

const InnerDiv = styled.div`
  flex: 1;
`;

const Slide = ({ value }) => {
  const [text, setText] = useState('');
  const section = useRef();

  useEffect(() => {
    section.current.scrollIntoView({ behavior: 'smooth' });
  }, [section, value]);

  useEffect(() => {
    toHTML(value).then((file) => setText(file.toString()));
  }, [value]);

  return (
    <Wrapper ref={section}>
      <InnerDiv dangerouslySetInnerHTML={{ __html: text }}></InnerDiv>
    </Wrapper>
  );
};

export default Slide;
