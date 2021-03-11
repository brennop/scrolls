import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Slide from "../components/Slide";
import useResizeObserver from "use-resize-observer";
import { db } from "../services/firebase";
import dynamic from "next/dynamic";
import { EditLayout, LoadingWrapper } from "../styles";

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
  const [value, setValue] = useState(null);
  const [content, setContent] = useState("");
  const router = useRouter();
  const { doc } = router.query;
  const presentation = useRef();

  useResizeObserver({
    ref: presentation,
    onResize: () => presentation.current.scrollBy(0, 0),
  });

  useEffect(() => {
    if (doc) {
      db.ref(doc)
        .once("value")
        .then((snapshot) => {
          const value = snapshot.val();

          if (value == null) return;

          setValue(value);
        });
      document.title = `${doc} - Scrolls`;
    }
  }, [doc]);

  const commit = (value) => db.ref(doc).set(value);

  return value != null ? (
    <EditLayout>
      <CodeEditor
        initialValue={value}
        roomName={doc}
        commit={commit}
        onChange={setContent}
      />
      <Presentation ref={presentation}>
        {content
          .split(/(?<=^|\n)#(?=[\n ])/)
          .slice(1)
          .map((pane) => (
            <Slide value={"#" + pane} key={pane} />
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
