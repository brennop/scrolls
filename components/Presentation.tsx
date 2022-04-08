import React, { useEffect, useRef, useState } from 'react';
import useResizeObserver from 'use-resize-observer';
import { Config } from 'utils/frontmatter';
import { toHTML } from '../utils/markdown';
import Toolbar from './Toolbar';

type PresentationProps = {
  content: string;
  config: Config;
  toolbar?: React.ReactNode;
  print?: boolean;
  line: number;
};

export default function Presentation({
  content,
  config,
  // FIXME: toolbar feels weird, maybe context can fix it
  toolbar,
  print,
  line,
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

  useEffect(() => {
    // use current cursor line on editor to find slide
    // TODO: improve readability this feels like a hack
    const groups = `${content}\n`
      .split(/^# /m)
      .slice(1)
      .reduce(
        (arr, group, index) => [
          ...arr,
          ...group
            .split('\n')
            .slice(1)
            .map(() => index),
        ],
        []
      );
    const current = groups[line] || 0;
    container.current.scrollTo({
      left: container.current.clientWidth * current,
      behavior: 'smooth',
    });
  }, [line, content]);

  return (
    <>
      <div
        ref={container}
        className={config?.theme}
        css={`
          ${
            print
              ? ''
              : `
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        display: flex;
        flex: 1;
            `
          }

          & > section {
            padding: 1em;
            font-size: 2vw;
            width: ${print ? '1280px' : '100%'};
            height: ${print ? '720px' : '100%'};
            flex: 1 0 auto;
            scroll-snap-align: start;
            display: flex;
            flex-direction: column;
            align-items: ${config.align};
            justify-content: ${config.justify};
          },
        `}
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
