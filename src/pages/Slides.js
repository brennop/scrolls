import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import firebase from "firebase/app";
import "firebase/database";
import { useParams, useRouteMatch } from "react-router-dom";
import Slide from "../components/Slide";
import useResizeObserver from "use-resize-observer";
import CodeEditor from "../components/Editor";
import Theme from "../components/Theme";

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

const Sidebar = styled.div`
  height: 100%;
`;

const app = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  databaseURL: "https://scroll-232ac.firebaseio.com/",
});

const db = app.database();

const initialValue = { data: "" };

function Slides() {
  const [value, setValue] = useState(initialValue);
  const { doc } = useParams();
  const match = useRouteMatch({ path: "/:doc/present" });
  const presentation = useRef();

  useResizeObserver({
    ref: presentation,
    onResize: () => presentation.current.scrollBy(0, 0),
  });

  useEffect(() => {
    db.ref(doc).on("value", (value) => setValue(value.val() || initialValue));
    document.title = `${doc} - Scrolls`;
  }, [doc]);

  const handleEdit = (data) => {
    db.ref(doc).set({ ...value, data });
  };

  const handleTheme = (theme) => {
    db.ref(doc).set({ ...value, theme });
  };

  return (
    <Layout>
      {!match && (
        <Sidebar>
          <Theme theme={value.theme} onChange={handleTheme} />
          <CodeEditor value={value.data} onChange={handleEdit} />
        </Sidebar>
      )}
      <Presentation ref={presentation} className={value.theme}>
        {value.data
          .split(/(?<=^|\n)#(?=[\n ])/)
          .slice(1)
          .map((pane) => (
            <Slide value={"#" + pane} key={pane} />
          ))}
      </Presentation>
    </Layout>
  );
}

export default Slides;
