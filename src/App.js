import React from "react";
//components and pages
import Home from './pages/Home';
import GlobalStyles from "./components/GlobalStyle";
import { Route } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <div>
      <GlobalStyles />
      <Nav />
      <Route path={["/game/:id", "/"]}>
        <Home />
      </Route>
    </div>
  );
}

export default App;
