import React, { useState, useEffect } from 'react'
const ENDPOINT = "https://Wyvern-API.huski3.repl.co/api/chat"

// socket io
import { io, Socket } from 'socket.io-client'

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
} from "@react-firebase/auth"

// Google Sign in
// Can be modified to handle all logins later
function gSignIn(firebase:any) {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(googleAuthProvider)
}

class auth {
    isSignedIn: any

    utoken: any
    uname: any
    uemail: any
}

const authLogs = new auth()

function createuser() {
    const http = new XMLHttpRequest()
    http.open("GET", "https://wyvern-api.huski3.repl.co/api/auth/register?token=" + authLogs.utoken + "&username=" + authLogs.uname + "&email=" + authLogs.uemail)
    http.send()
    http.onload = () => {
        var obj = JSON.parse(http.responseText.replace(/'/g, '"'));
        console.log("recieved object:", obj)
    }
}

const socket = io("https://Wyvern-API.huski3.repl.co/api/chat")

socket.on('connection', socket => {
    socket.emit('joined', { 'serverchannel': 4298340998734895 })
    console.log("Connected")
})
socket.on('message', function (data) {
    console.log(data)
})

// Main function which is gonna return stuff
function signin() {
    if (authLogs.isSignedIn?.isSignedIn == true) {
        return (
            <FirebaseAuthProvider firebase={firebase} {...fcfg}>
                <button className="SignOut btn btn-outline-light" onClick={() => { firebase.auth().signOut() }}>Sign Out</button>
                <button className="SignOut btn btn-outline-light" onClick={() => {console.log(authLogs.isSignedIn)}}>log</button>
            </FirebaseAuthProvider>
        )
    }
    
    return (
        <FirebaseAuthProvider firebase={firebase} {...fcfg}>
            <div className="signin-box">
                <section className="signinBtns">
                    <button className="GSignIn btn btn-outline-light" onClick={() => {gSignIn(firebase)}}>Sign In with Google</button>
                    <button className="SignOut btn btn-outline-light" onClick={() => { console.log(authLogs.isSignedIn.isSignedIn) }}>log</button>
                    <button className="SignOut btn btn-outline-light" onClick={() => { createuser() }}>create acc</button>
                </section>

                <FirebaseAuthConsumer>
                    {({ isSignedIn, user }) => {
                        var userobj = { user }
                        authLogs.isSignedIn = { isSignedIn }
                        authLogs.utoken = userobj.user?.uid
                        authLogs.uname = userobj.user?.displayName
                        authLogs.uemail = userobj.user?.email
                    }}
                </FirebaseAuthConsumer>
            </div>
        </FirebaseAuthProvider>
    )
    
}

export default signin