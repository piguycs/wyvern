import React, { Component, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Nav from './components/navbar'
import Socketio from './components/socketio'

import TestApp from './components/app'
import SignIn from './components/signin'

import './index.css'
import './styles/bootstrap-min.css'
import './styles/style.css'
import './styles/signin.css'

import { BrowserRouter as Router, Link, Redirect, Route } from "react-router-dom"

// scripts
import getServerList from './scripts/getservers'

import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer
} from "@react-firebase/auth"
import firebase from "firebase/app"
import "firebase/auth"
import { fcfg } from './firebase/firebase'

let slist = await getServerList("")
console.log("LOG: Fetched server list: " + slist)

var usrSignedIn:boolean = false

class MainChat extends Component {
  state = { isSignedIn: true }

  render() {
    return this.state.isSignedIn ?(
      <div className="mainapp">
        <Nav serverList={slist} />
        <Socketio server="hello" />
      </div>
    ) : null
  }

}


ReactDOM.render(
  <React.StrictMode>
      <FirebaseAuthProvider firebase={firebase} {...fcfg}>
        <FirebaseAuthConsumer>
          {({ isSignedIn }) => {
            console.log(isSignedIn)
            if (isSignedIn === true) {
              usrSignedIn = true
              console.log("usrSignedIn updated to TRUE")
            } else {
              usrSignedIn = false
              console.log("usrSignedIn updated to FALSE")
            }
          }}
        </FirebaseAuthConsumer>
      </FirebaseAuthProvider>

    <Router>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>

      {/* ROUTES TO HOMEPAGE, WILL HAVE SOME NICE STUFF HERE */}
      <Route path="/home">
        <a href="/app">app</a>
      </Route>

      <Route path="/signin">
        <SignIn />
      </Route>

      {/* POINTS TO THE ACTUAL APP */}
      <Route path="/app">
        <FirebaseAuthProvider firebase={firebase} {...fcfg}>
          <FirebaseAuthConsumer>
            {({ isSignedIn }) => {
              console.log(isSignedIn)
              if (isSignedIn === true) {
                return <MainChat />
              } else {
                return <a href="/signin">FML</a>
              }
            }}
          </FirebaseAuthConsumer>
        </FirebaseAuthProvider>
        
      </Route>
      
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)