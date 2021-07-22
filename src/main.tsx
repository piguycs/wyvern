import React, { Component, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Nav from './components/navbar'
import Socketio from './components/socketio'

import TestApp from './components/app'
import TestSignIn from './components/signin'

import './index.css'
import './styles/bootstrap-min.css'
import './styles/style.css'
import './styles/signin.css'

import { BrowserRouter as Router, Link, Route } from "react-router-dom"

// scripts
import getServerList from './scripts/getservers'

import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer
} from "@react-firebase/auth"
import firebase from "firebase/app"
import "firebase/auth"
import { fcfg } from './firebase/firebase'

let slist = await getServerList("key")
console.log("LOG: Fetched server list: " + slist)

var usrSignedIn:boolean = false

{/* <div className="mainapp">
  <Nav serverList={slist} />
  <Socketio server="hello" />
</div> */}


function MainChatFUCKIT() {
  var testNumber:number = 0
  const [aFuckingNumber, setAFuckingNumber] = useState(0)
  useEffect(() => {
    console.count("fuck")
    setAFuckingNumber((a) => a = a+1)
  }, [testNumber])
  
  return (
    <div>
      <h1>{aFuckingNumber}</h1>
      <button onClick={() => testNumber = testNumber+1}>HIII</button>
      <button onClick={() => console.log(testNumber)}>{ testNumber }</button>
    </div>
  )
}

class MainChat extends Component {
  constructor(props:any) {
    super(props)
    this.state = {isSignedIn:false}
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
      {/* ROUTES TO HOMEPAGE, WILL HAVE SOME NICE STUFF HERE */}
      <Route path="/home">
        <a href="/app">app</a>
      </Route>

      <Route path="/signin">
        <TestSignIn />
      </Route>

      {/* POINTS TO THE ACTUAL APP */}
      <Route path="/app">
        <MainChat />
      </Route>
      
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)