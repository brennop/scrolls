import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Slide from '../components/Slide';
import useResizeObserver from 'use-resize-observer';
import { db } from '../services/firebase';
import dynamic from 'next/dynamic';
import { EditLayout, LoadingWrapper } from '../styles';
import matter from 'gray-matter';
import ThemeLoader from '../components/ThemeLoader';
import { toHTML } from '../utils/markdown';

const CodeEditor = dynamic(() => import('../components/Editor'), {
  ssr: false,
});

const Presentation = styled.div`
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  display: flex;
  flex: 1;
  text-align: center;

  section {
    padding: 1em;
    font-size: 2em;
    width: 100%;
    flex: 1 0 auto;
    scroll-snap-align: start;
  }
`;

function Slides() {
  const router = useRouter();
  const doc = router.query.doc as string;
  const container = useRef<HTMLDivElement>(null);

  const [presentation, setPresentation] = useState(null);
  const [value, setValue] = useState(null);
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);

  const { content, data } = useMemo(() => {
    try {
      return matter(markdown);
    } catch {
      return { content: markdown, data: null };
    }
  }, [markdown]);

  useResizeObserver({
    ref: container,
    onResize: () => {
      if (container?.current !== null) {
        container.current.scrollBy(0, 0);
      }
    },
  });

  useEffect(() => {
    if (doc) {
      db.ref(doc)
        .once('value')
        .then((snapshot) => {
          setLoading(false);
          const value = snapshot.val();

          if (value == null) return;

          setValue(value);
        });
      document.title = `${doc} - Scrolls`;
    }
  }, [doc]);

  const commit = (value: any) => db.ref(doc).set(value);

  useEffect(() => {
    toHTML(content).then((file) => setPresentation(file.result));
  }, [content]);

  return loading === false ? (
    <EditLayout>
      <ThemeLoader theme={data?.theme} />
      <CodeEditor initialValue={value} roomName={doc} commit={commit} onChange={setMarkdown} />
      <Presentation ref={container} className={data?.theme}>
        {presentation}
      </Presentation>
    </EditLayout>
  ) : (
    <LoadingWrapper>
      <img src="tail-spin.svg" alt="loading indicator" />
    </LoadingWrapper>
  );
}

export default Slides;
