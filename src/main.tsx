import React from 'react'
import ReactDOM from 'react-dom'
import Nav from './components/navbar'
import Signin from './components/signin-old'
import Socketio from './components/socketio'

import './index.css'
import './styles/bootstrap-min.css'

import { BrowserRouter as Router, Route } from "react-router-dom"

// scripts
import getServerList from './scripts/getservers'

let slist = await getServerList("B3hq7YvYNVOHsH9sAQsFlmAC4a93")
console.log("LOG: Fetched server list: " + slist)


ReactDOM.render(
  <React.StrictMode>
    <Router>


      {/* ROUTES TO HOMEPAGE, WILL HAVE SOME NICE STUFF HERE */}
      <Route path="/home">
        <a href="/app">app</a>
      </Route>

      <Route path="/signin">

      </Route>

      {/* POINTS TO THE ACTUAL APP */}
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