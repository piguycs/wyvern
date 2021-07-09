import React, { useState } from 'react'
import '../styles/style.css'
import '../styles/signin.css'

import firebase from "firebase/app";
import "firebase/auth";
import {
    FirebaseAuthProvider,
    FirebaseAuthConsumer,
    IfFirebaseAuthed,
    IfFirebaseAuthedAnd
} from "@react-firebase/auth";

function signin() {
    const fcfg = {
        apiKey: "AIzaSyB_PBMA8X-sNvzh6bXqpFxfbeh_msdKMoI",
        projectId: "wyvern-chat",
        databaseURL: "",
        authDomain: "wyvern-chat.firebaseapp.com"
    }

    return (
        <FirebaseAuthProvider firebase={firebase} {...fcfg}>
            <div>
                <button
                    onClick={() => {
                        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                        firebase.auth().signInWithPopup(googleAuthProvider);
                    }}
                >
                    Sign In with Google
                </button>
                <button
                    onClick={() => {
                        firebase.auth().signOut();
                    }}
                >
                    Sign Out
                </button>
                <FirebaseAuthConsumer>
                    {({ isSignedIn }) => {
                        return (
                            <pre style={{ height: 300, overflow: "auto" }}>
                                {JSON.stringify({ isSignedIn }, null, 2)}
                            </pre>
                        )
                    }}
                </FirebaseAuthConsumer>
                <div>
                    <IfFirebaseAuthed>
                        {() => {
                            return <div>You are authenticated</div>;
                        }}
                    </IfFirebaseAuthed>
                    <IfFirebaseAuthedAnd
                        filter={({ providerId }) => providerId !== "anonymous"}
                    >
                        {({ providerId }) => {
                            return <div>You are authenticated with {providerId}</div>;
                        }}
                    </IfFirebaseAuthedAnd>
                </div>
            </div>
        </FirebaseAuthProvider>
    )
}

export default signin