import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Editor from "./pages/Editor";

function App() {
  return (
    <Router>
      <Route path="/:document">
        <Editor />
      </Route>
      <Route path="/" exact>
        Home
      </Route>
    </Router>
  );
}

export default App;

