import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import Nav from './components/navbar'
import Socketio from './components/socketio'
import SignIn from './components/signin'
import TrySignIn from './components/trySignIn'

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

var slist = await getServerList(localStorage.getItem('uid')!)

interface slist {slist:Array<string>}
function MainChat({ slist }: slist) {
  const serverNumber = createContext(slist)
  return (
    <div className="mainapp">
      <Nav serverList={slist} />
      <Socketio />
      <h1 style={{ gridArea: 'list' }}>SHIT GOES HERE</h1>
    </div>
  )
}


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

      <Route path="/signin">
        <SignIn />
      </Route>

      {/* POINTS TO THE ACTUAL APP */}
      <Route path="/app">
        <FirebaseAuthProvider firebase={firebase} {...fcfg}>
          <FirebaseAuthConsumer>
            {({ isSignedIn }) => {
              console.log("sign in state is", isSignedIn)
              if (isSignedIn === true) {
                return <MainChat slist={slist} />
              } else {
                return <TrySignIn />
              }
            }}
          </FirebaseAuthConsumer>
        </FirebaseAuthProvider>
        
      </Route>
      
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)