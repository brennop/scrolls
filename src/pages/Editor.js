import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import firebase from "firebase/app";
import "firebase/database";
import { useParams, useRouteMatch } from "react-router-dom";
import Slide from "../components/Slide";
import useResizeObserver from "use-resize-observer";

const Presentation = styled.div`
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

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

const TextArea = styled.textarea`
  border: none;
  resize: horizontal;
  width: 25vw;
  padding: 1em;
  background: #212121;
  color: #a0a0a0;
`;

const app = firebase.initializeApp({
  apiKey: "AIzaSyAP2VYvHMtWhqFXPFhk8WehiSe9sdTAq1k",
  databaseURL: "https://scroll-232ac.firebaseio.com/",
});

const db = app.database();

function Editor() {
  const [value, setValue] = useState("");
  const { doc } = useParams();
  const match = useRouteMatch({ path: "/:doc/present" });
  const presentation = useRef();

  useResizeObserver({
    ref: presentation,
    onResize: () => presentation.current.scrollBy(0, 0),
  });

  useEffect(() => {
    db.ref(doc).on("value", (value) => setValue(value.val()));
  }, [doc]);

  const handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;

    db.ref(doc).set(value);
  };

  return (
    <Layout>
      {!match && <TextArea autoFocus value={value} onChange={handleChange} />}
      <Presentation ref={presentation}>
        {value
          .split(/(?<=^|\n)#(?=[\n ])/)
          .slice(1)
          .map((pane, index) => (
            <Slide value={"#" + pane} key={pane + index} />
          ))}
      </Presentation>
    </Layout>
  );
}

export default Editor;

