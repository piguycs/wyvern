import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, Redirect, Route } from "react-router-dom"

import App from './components/app/app'
import Login from './components/login'

import './styles/main.scss'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/">
        <Redirect to="home" />
      </Route>

      {/* ROUTES TO HOMEPAGE, WILL HAVE SOME NICE STUFF HERE */}
      <Route path="/home">
        <a href="app">app</a>
      </Route>

      <Route path="/app">
        <App />
      </Route>

      <Route path="/signin" component={Login} />
      
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)