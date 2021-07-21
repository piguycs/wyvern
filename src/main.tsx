import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Nav from './components/navbar'
import Signin from './components/signin'
import Socketio from './components/socketio'

import { BrowserRouter as Router,  Route } from "react-router-dom"

// scripts
import getServerList from './scripts/getservers'

console.log(getServerList("lol"))

import './styles/bootstrap-min.css'
let slist = ["12","13"]

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/home">
        <a href="/app">app</a>
      </Route>
      <Route path="/app">
        <div className="mainapp">
          <Nav serverList={slist} />
          <Signin />
          <Socketio server="hello" />
        </div>
      </Route>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)