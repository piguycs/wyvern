import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import App from "./components/app/app";
import Login from "./components/login";
import SignUp from "./components/signup";

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
        <br />
        <a href="signup">Create User</a>
      </Route>

      <Route path="/app" component={App} />
      <Route path="/signin" component={Login} />
      <Route path="/signup" component={SignUp} />
    </Router>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
