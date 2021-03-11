import React, { useState, useEffect, useRef, useMemo } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Slide from "../components/Slide";
import useResizeObserver from "use-resize-observer";
import { db } from "../services/firebase";
import dynamic from "next/dynamic";
import { EditLayout, LoadingWrapper } from "../styles";
import matter from "gray-matter";
import ThemeLoader from "../components/ThemeLoader";

const CodeEditor = dynamic(() => import("../components/Editor"), {
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
  const presentation = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState(null);
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);

  const { content, data } = useMemo(() => {
    try {
      return matter(markdown);
    } catch {
      return { content: markdown, data: null };
    }
  }, [markdown]);

  useResizeObserver({
    ref: presentation,
    onResize: () => {
      if (presentation?.current !== null) {
        presentation.current.scrollBy(0, 0);
      }
    },
  });

  useEffect(() => {
    if (doc) {
      db.ref(doc)
        .once("value")
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

  useEffect(() => {}, [data]);

  return loading === false ? (
    <EditLayout>
      <ThemeLoader theme={data?.theme} />
      <CodeEditor
        initialValue={value}
        roomName={doc}
        commit={commit}
        onChange={setMarkdown}
      />
      <Presentation ref={presentation} className={data?.theme}>
        {content.split(/(?<=^|\n)---(?=[\n ])/).map((pane) => (
          <Slide value={pane} key={pane} />
        ))}
      </Presentation>
    </EditLayout>
  ) : (
    <LoadingWrapper>
      <img src="tail-spin.svg" />
    </LoadingWrapper>
  );
}

export default Slides;
