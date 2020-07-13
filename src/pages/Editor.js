import React, { useState, useEffect } from "react";
import remark from "remark";
import sectionize from "remark-sectionize";
import emoji from "remark-emoji";
import styled from "@emotion/styled";
import rehype from "remark-rehype";
import react from "rehype-react";
import firebase from "firebase/app";
import "firebase/database";
import { useParams } from "react-router-dom";

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

const TextArea = styled.textarea`
  border: none;
  resize: horizontal;
  width: 30vw;
  padding: 1em;
  background: #212121;
  color: #a0a0a0;
`;

const Presentation = styled.div`
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  display: flex;

  section {
    padding: 1em;
    font-size: 2em;
    width: 100%;
    flex: 1 0 auto;
    scroll-snap-align: start;
  }
`;

const app = firebase.initializeApp({
  apiKey: "AIzaSyAP2VYvHMtWhqFXPFhk8WehiSe9sdTAq1k",
  databaseURL: "https://scroll-232ac.firebaseio.com/",
});

const db = app.database();

function Editor() {
  const [value, setValue] = useState("");
  const { doc } = useParams();

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
      <TextArea autoFocus value={value} onChange={handleChange} />
      <Presentation>
        {
          remark()
            .use(emoji)
            .use(sectionize)
            .use(rehype)
            .use(react, {
              createElement: React.createElement,
              Fragment: React.Fragment,
            })
            .processSync(value).result
        }
      </Presentation>
    </Layout>
  );
}

export default Editor;

