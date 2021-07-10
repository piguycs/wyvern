import React, { useState } from 'react'

// Styles
import '../styles/style.css'
import '../styles/signin.css'

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

// Auth State logger
// Will be used later for auth tokens etc
function authState(isSignedIn:string) {
    console.log(isSignedIn)
}


// Main function which is gonna return stuff
function signin() {
    return (
        <FirebaseAuthProvider firebase={firebase} {...fcfg}>
            <div className="signin-box">
                <section className="signinBtns">
                    <button className="GSignIn btn btn-outline-light" onClick={() => {gSignIn(firebase)}}>Sign In with Google</button>
                    <button className="SignOut btn btn-outline-light" onClick={() => {firebase.auth().signOut()}}>Sign Out</button>
                </section>

                <FirebaseAuthConsumer>
                    {({ isSignedIn }) => {
                        authState(JSON.stringify({ isSignedIn }, null, 2))
                    }}
                </FirebaseAuthConsumer>
            </div>

        </FirebaseAuthProvider>
    )
}

export default signin