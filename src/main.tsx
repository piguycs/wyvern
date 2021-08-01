import React, { createContext } from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import './styles/bootstrap-min.css'
import './styles/style.css'
import './styles/signin.css'

import { BrowserRouter as Router, Link, Redirect, Route } from "react-router-dom"

import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer
} from "@react-firebase/auth"
import firebase from "firebase/app"
import "firebase/auth"
import { fcfg } from './firebase/firebase'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>

      {/* ROUTES TO HOMEPAGE, WILL HAVE SOME NICE STUFF HERE */}
      <Route path="/home">
        <a href="/app">app</a>
      </Route>
      
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)