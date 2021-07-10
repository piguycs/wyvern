import React, { useState } from 'react'

// Styles
import '../styles/style.css'
import '../styles/signin.css'
// import { Button } from 'react-bootstrap'

// Firebase
import firebase from "firebase/app"
import "firebase/auth"

// Imports firebase config from a ts file
import { fcfg } from "../firebase/firebase"

import {
    FirebaseAuthProvider,
    FirebaseAuthConsumer
} from "@react-firebase/auth";

// Google Sign in
// Can be modified to handle all logins later
function gSignIn(firebase:any) {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(googleAuthProvider)
}

class auth {
    constructor(public auth:any) { }
}

const authState = new auth("isSignedIn")

// Main function which is gonna return stuff
function signin() {
    return (
        <FirebaseAuthProvider firebase={firebase} {...fcfg}>
            <div className="signin-box">
                <section className="signinBtns">
                    <button className="GSignIn btn btn-outline-light" onClick={() => {gSignIn(firebase)}}>Sign In with Google</button>
                    <button className="SignOut btn btn-outline-light" onClick={() => {firebase.auth().signOut()}}>Sign Out</button>    
                    <button className="SignOut btn btn-outline-light" onClick={() => { console.log(authState.auth) }}>log</button>
                </section>

                <FirebaseAuthConsumer>
                    {({ isSignedIn }) => {
                        authState.auth = { isSignedIn }
                    }}
                </FirebaseAuthConsumer>
            </div>

        </FirebaseAuthProvider>
    )
}

export default signin