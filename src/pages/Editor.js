import React, { useState, useEffect } from "react";
import remark from "remark";
import sectionize from "remark-sectionize";
import emoji from "remark-emoji";
import styled from "@emotion/styled";
import rehype from "remark-rehype";
import react from "rehype-react";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  height: 100vh;
`;

const TextArea = styled.textarea`
  border: none;
  resize: none;
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

function Editor() {
  const [value, setValue] = useState("");

  return (
    <Layout>
      <TextArea autoFocus onChange={(e) => setValue(e.target.value)} />
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

