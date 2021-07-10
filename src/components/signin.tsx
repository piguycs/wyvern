import React, { useState } from 'react'
import '../styles/style.css'
import '../styles/signin.css'

import firebase from "firebase/app";
import "firebase/auth";
import { fcfg } from "../firebase/firebase"
import {
    FirebaseAuthProvider,
    FirebaseAuthConsumer,
    IfFirebaseAuthed,
    IfFirebaseAuthedAnd
} from "@react-firebase/auth";

function gSignIn(firebase:any) {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(googleAuthProvider)
}

function authState(isSignedIn:string) {
    console.log(isSignedIn)
}

function signin() {

    return (
        <FirebaseAuthProvider firebase={firebase} {...fcfg}>
            <div>
                <section className="signinBtns">
                    <button onClick={() => {gSignIn(firebase)}}>Sign In with Google</button>
                    <button onClick={() => {firebase.auth().signOut()}}>Sign Out</button>
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