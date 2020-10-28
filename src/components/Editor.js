import React from "react";
import styled from "@emotion/styled";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-tomorrow_night";

const Container = styled.div`
  border: none;
  width: 25vw;
  overflow-y: auto;
  font-family: monospace;
  color: #aaa;
  background: #1d1f21;
  height: 100%;
  padding: 1em;
`;

const CodeEditor = ({ show, onChange, value }) => {
  return show ? (
    <Container>
      <AceEditor
        mode="markdown"
        value={value}
        onChange={onChange}
        theme="tomorrow_night"
        showGutter={false}
        width="100%"
        height="100%"
        fontSize={16}
        wrapEnabled
      />
    </Container>
  ) : null;
};

export default CodeEditor;
