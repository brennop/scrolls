import React from "react";
import Editor from "react-simple-code-editor";
import styled from "@emotion/styled";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-markdown";

const Container = styled.div`
  border: none;
  resize: horizontal;
  width: 25vw;
  overflow-y: auto;
  font-family: monospace;
  color: #aaa;
  background: #222;
`;

const CodeEditor = ({ show, onChange, value }) => {
  return show ? (
    <Container>
      <Editor
        padding={16}
        value={value}
        onValueChange={(code) => onChange(code)}
        highlight={(code) => highlight(code, languages.markdown)}
      />
    </Container>
  ) : null;
};

export default CodeEditor;

