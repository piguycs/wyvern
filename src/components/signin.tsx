import React from "react"

// Firebase
import firebase from "firebase/app"
import "firebase/auth"
import { Link } from "react-router-dom"

// Imports firebase config from a ts file
import { fcfg } from "../firebase/firebase"

import {
    FirebaseAuthProvider,
    FirebaseAuthConsumer
} from "@react-firebase/auth"

function signin() {
    return (    
        <div className="signInDiv">
            <FirebaseAuthProvider firebase={firebase} {...fcfg}>
                <FirebaseAuthConsumer>
                    {({ isSignedIn, user }) => {
                        if (isSignedIn === true) {
                            return (
                                <div className="signin-box">
                                    <p>You are signed in</p>
                                    <Link to="/app" className="btn btn-outline-light">APP</Link>
                                    <button className="btn btn-outline-light" onClick={() => {firebase.app().auth().signOut()}}>
                                        Sign out
                                    </button>

                                </div>
                            )
                            // Signed In
                            // Redirect to app or sign out
                        } else {
                            return (
                                <div className="signin-box">
                                    <p>You are signed out</p>
                                    <button className="btn btn-outline-light" onClick={
                                        () => {
                                            const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
                                            firebase.auth().signInWithPopup(googleAuthProvider)
                                        }
                                    }>Sign In with Google</button>
                                </div>
                            )

                            // Signed out
                            // Signin in here
                        }
                    }}
                </FirebaseAuthConsumer>
            </FirebaseAuthProvider>
        </div>
    )
}


export default signin