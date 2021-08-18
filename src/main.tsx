import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import App from "./components/app/app";
import Login from "./components/login";

import "./styles/main.scss";

function Main() {
  return (
    <Router>
      <Route exact path="/">
        <Redirect to="home" />
      </Route>

      {/* ROUTES TO HOMEPAGE, WILL HAVE SOME NICE STUFF HERE */}
      <Route path="/home">
        <a href="app">app</a>
        <br />
        <a href="signin">signin</a>
      </Route>

      <Route path="/app">
        <App />
      </Route>

      <Route path="/signin" component={Login} />
    </Router>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
