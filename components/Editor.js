import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import CodeMirror from "codemirror";
import * as Y from "yjs";
import { CodemirrorBinding } from "y-codemirror";
import { WebrtcProvider } from "y-webrtc";
import useResizeObserver from "use-resize-observer";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/seti.css";
import "codemirror/mode/markdown/markdown";

const Container = styled.div`
  border: none;
  resize: horizontal;
  width: 25vw;
  overflow-y: auto;
  color: #aaa;
  background: #1d1f21;
  height: 100%;
  padding: 1em;

  .CodeMirror * {
    font-family: "Source Code Pro", monospace;
  }

  .CodeMirror {
    height: 100%;
    width: 100%
  }
}
`;

const CodeEditor = ({ roomName, initialValue, commit, onChange }) => {
  const container = useRef(null);
  const textarea = useRef(null);
  const [binding, setBinding] = useState();
  const [editor, setEditor] = useState();

  useEffect(() => {
    if (textarea.current && !binding) {
      const ydoc = new Y.Doc();
      const provider = new WebrtcProvider(roomName, ydoc, {
        signaling: ["ws://192.168.1.76:4444"],
      });
      const yText = ydoc.getText("codemirror");
      const yUndoManager = new Y.UndoManager(yText);

      const editor = CodeMirror.fromTextArea(textarea.current, {
        theme: "seti",
        mode: "markdown",
        lineWrapping: true,
      });

      if (initialValue) {
        const decoded = Uint8Array.from(initialValue);
        Y.applyUpdate(ydoc, decoded);
      }

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
      setEditor(editor);
    }
  }, [binding, commit, roomName, initialValue, onChange]);

  useResizeObserver({
    ref: container,
    onResize: () => {
      if (container?.current !== null) {
        editor.setSize("100%", "100%");
      }
    },
  });

  return (
    <Container ref={container}>
      <textarea ref={textarea} />
    </Container>
  );
};

export default CodeEditor;
