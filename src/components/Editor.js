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

const CodeEditor = ({ roomName, initialValue, commit, onChange }) => {
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

      const editor = CodeMirror.fromTextArea(textarea.current, {
        mode: "markdown",
        lineNumbers: true,
      });

      const decoded = Uint8Array.from(initialValue);
      Y.applyUpdate(ydoc, decoded);
      onChange(yText.toJSON());

      ydoc.on("update", () => {
        commit(Y.encodeStateAsUpdate(ydoc));
      });

      yText.observe(() => {
        onChange(yText.toJSON());
      });

      const binding = new CodemirrorBinding(yText, editor, provider.awareness, {
        yUndoManager,
      });
      setBinding(binding);
    }
  }, [binding, commit, roomName, initialValue, onChange]);

  return (
    <Container>
      <textarea ref={textarea} />
    </Container>
  );
};

export default CodeEditor;
