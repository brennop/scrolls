import React, { useEffect, useRef, useState } from 'react';
import useResizeObserver from 'use-resize-observer';
import { Config } from 'utils/frontmatter';
import { toHTML } from '../utils/markdown';
import Toolbar from './Toolbar';

type PresentationProps = {
  content: string;
  config: Config;
  toolbar?: React.ReactNode;
};

export default function Presentation({
  content,
  config,
  // FIXME: toolbar feels weird, maybe context can fix it
  toolbar,
}: PresentationProps): React.ReactElement {
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
      <div
        ref={container}
        className={config?.theme}
        css={{
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          display: 'flex',
          flex: 1,

          section: {
            padding: '1em',
            fontSize: '2vw',
            width: '100%',
            flex: '1 0 auto',
            scrollSnapAlign: 'start',
            display: 'flex',
            flexDirection: 'column',
            alignItems: config.align,
            justifyContent: config.justify,
          },
        }}
      >
        {presentation}
      </div>
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
