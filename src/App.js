import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Slides from "./pages/Slides";

function App() {
  return (
    <Router>
      <Route path="/:doc">
        <Slides />
      </Route>
      <Route path="/" exact>
        Home
      </Route>
    </Router>
  );
}

export default App;

