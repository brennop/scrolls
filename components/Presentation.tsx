import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useResizeObserver from 'use-resize-observer';
import { toHTML } from '../utils/markdown';

const Container = styled.div`
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  display: flex;
  flex: 1;

  section {
    padding: 1em;
    font-size: 2em;
    width: 100%;
    flex: 1 0 auto;
    scroll-snap-align: start;
  }
`;

type PresentationProps = {
  content: string;
  theme: string;
};

const Presentation = ({ content, theme }: PresentationProps): React.ReactElement => {
  const container = useRef<HTMLDivElement>(null);
  const [presentation, setPresentation] = useState(null);

  useResizeObserver({
    ref: container,
    onResize: () => {
      container?.current.scrollBy(0, 0);
    },
  });

  useEffect(() => {
    toHTML(content).then((file) => setPresentation(file.result));
  }, [content]);

  return (
    <Container ref={container} className={theme}>
      {presentation}
    </Container>
  );
};

export default Presentation;
