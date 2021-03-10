import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import * as Y from "yjs";
import { CodemirrorBinding } from "y-codemirror";
import { WebrtcProvider } from "y-webrtc";

const Container = styled.div`
  border: none;
  resize: horizontal;
  width: 25vw;
  overflow-y: auto;
  font-family: monospace;
  color: #aaa;
  background: #1d1f21;
  height: 100%;
  padding: 1em;
`;

const CodeEditor = ({ show, roomName, onChange, value }) => {
  const textarea = useRef(null);
  const [binding, setBinding] = useState();

  useEffect(() => {
    if (textarea.current && !binding) {
      const ydoc = new Y.Doc();
      const provider = new WebrtcProvider(roomName, ydoc, {
        signaling: ["ws://192.168.1.76:4444"],
      });
      const yText = ydoc.getText("codemirror");
      const yUndoManager = new Y.UndoManager(yText);

      yText.observe(() => onChange(yText.toJSON()));

      const editor = CodeMirror.fromTextArea(textarea.current, {
        value: value,
        mode: "markdown",
        lineNumbers: true,
      });

      const binding = new CodemirrorBinding(yText, editor, provider.awareness, {
        yUndoManager,
      });
      setBinding(binding);
    }
  }, [binding, onChange, roomName, value]);

  return show ? (
    <Container>
      <textarea ref={textarea} />
    </Container>
  ) : null;
};

export default CodeEditor;
