import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import firebase from "firebase/app";
import "firebase/database";
import { useParams, useRouteMatch } from "react-router-dom";
import Slide from "../components/Slide";
import useResizeObserver from "use-resize-observer";
import CodeEditor from "../components/Editor";
import matter from "gray-matter";

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

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

const getTheme = (text) => {
  try {
    console.log("Nelsons")
    return matter(text).data.theme;
  } catch {
    console.log("Risos")
    return "default";
  }
};

const app = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  databaseURL: "https://scroll-232ac.firebaseio.com/",
});

const db = app.database();

function Slides() {
  const [value, setValue] = useState("");
  const [theme, setTheme] = useState("default");
  const { doc } = useParams();
  const match = useRouteMatch({ path: "/:doc/present" });
  const presentation = useRef();

  useResizeObserver({
    ref: presentation,
    onResize: () => presentation.current.scrollBy(0, 0),
  });

  useEffect(() => {
    db.ref(doc).on("value", (snapshot) => {
      const value = snapshot.val();
      console.log(value)
      if (!value) return;

      setValue(value);
      setTheme(getTheme(value));
    });
    document.title = `${doc} - Scrolls`;
  }, [doc]);

  const handleEdit = (data) => {
    db.ref(doc).set(data);
  };

  return (
    <Layout>
      <CodeEditor value={value} onChange={handleEdit} show={!match} />
      <Presentation ref={presentation} className={theme}>
        {value
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
