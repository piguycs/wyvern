import React, { useState } from 'react'
import logo from './logo.svg'
import './styles/style.css'
import './styles/navbar.css'

// Firebase
import firebase from "firebase/app"
import "firebase/auth"

// Imports firebase config from a ts file
import { fcfg } from "./firebase/firebase"

import {
    FirebaseAuthProvider,
    FirebaseAuthConsumer
} from "@react-firebase/auth"

function navbar() {
    return (
        <nav className="navbar">
            Wyvren
            <FirebaseAuthProvider firebase={firebase} {...fcfg}>
                <div>
                    <button className="signoutnav" onClick={() => firebase.auth().signOut()}>Signout</button>
                </div>
                <FirebaseAuthConsumer>
                    {({ isSignedIn, user }) => {
                        if (!{ isSignedIn }.isSignedIn) {
                            // signIn.userSignedOut()
                        }
                    }}
                </FirebaseAuthConsumer>
            </FirebaseAuthProvider>
        </nav>
    )
}

export default navbar
