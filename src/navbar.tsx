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
    FirebaseAuthProvider
} from "@react-firebase/auth"

function navbar() {
    return (
        <nav className="navbar">
            <p className="branding">Wyvren</p>
            <div className="serverList">
                hello?
            </div>
            <FirebaseAuthProvider firebase={firebase} {...fcfg}>
                    <button className="signoutnav" onClick={() => firebase.auth().signOut()}></button>
            </FirebaseAuthProvider>
        </nav>
    )
}

export default navbar
