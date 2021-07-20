import React, { Component } from 'react'

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
} from "@react-firebase/auth"

class signIn extends Component {
    state = { isSignedIn:false }
    userSignedIn = () => {
        this.setState({ isSignedIn: true})
    }
    userSignedOut = () => {
        this.setState({ isSignedIn: false })
    }
    setUid = (uid:string) => {
        console.log("uid", uid)
        if (this.state.isSignedIn) {
            this.setState({ isSignedIn:true, token:uid })
        }
    }
    render() {
        if(!this.state.isSignedIn) {
            return (
                <FirebaseAuthProvider firebase={firebase} {...fcfg}>
                    <div className="signin-box">
                        <h1 className="SignInTxt">Sign In</h1>
                        <button className="btn btn-outline-light" onClick={
                        () => {
                            this.userSignedIn
                            const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
                            firebase.auth().signInWithPopup(googleAuthProvider)
                            }
                        }>Sign In with Google</button>
                        <button className="SignOut btn btn-outline-light" onClick={() => { console.log(this.state.isSignedIn) }}>log</button>
                    </div>
                    <FirebaseAuthConsumer>
                        {({ isSignedIn, user }) => {
                            var userobj = { user }.user
                            if (userobj?.uid != undefined) {
                                this.setUid(userobj.uid)
                                localStorage.setItem("uid", userobj.uid)
                            }
                            if ({ isSignedIn }.isSignedIn) {
                                this.userSignedIn()
                            }
                        }}
                    </FirebaseAuthConsumer>
                </FirebaseAuthProvider>
            )
        }
        return (
            <FirebaseAuthProvider firebase={firebase} {...fcfg}>
                <FirebaseAuthConsumer>
                    {({ isSignedIn }) => {
                        if (!{ isSignedIn }.isSignedIn) {
                            this.userSignedOut()
                        }
                    }}
                </FirebaseAuthConsumer>
            </FirebaseAuthProvider>
        )
    }
}

export default signIn