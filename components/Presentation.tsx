import React, { forwardRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useResizeObserver from 'use-resize-observer';
import { toHTML } from '../utils/markdown';
import Toolbar from './Toolbar';

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
  toolbar: React.ReactNode;
};

export default function Presentation({
  content,
  theme,
  // FIXME: toolbar feels weird, maybe context can fix it
  toolbar,
}: PresentationProps): React.ReactElement {
  // default ref has to be declared unconditionally
  const container = useRef<HTMLDivElement>();
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

  const handleFullscreen = () => {
    container.current.requestFullscreen();
  };

  return (
    <>
      <Container ref={container} className={theme}>
        {presentation}
      </Container>
      <Toolbar>
        <button onClick={handleFullscreen}>
          <span className="emoji">↗ </span>
          Fullscreen
        </button>
        {toolbar}
      </Toolbar>
    </>
  );
}
