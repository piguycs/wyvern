import React, { Component, useState } from 'react'
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

class navbar extends Component {
    state = { serverList: [] }
    getServerList = () => {
        fetch('https://wyvern-api.huski3.repl.co/api/real_user?token=')
            .then((response) => {
                response.json().then(
                    (data) => {
                        this.setState({ serverList: data.servers })
                    }
                )
            })
    }
    render() {
        return (
            <nav className="navbar">
                <p className="branding">Wyvren</p>
                <div className="serverList">
                    <button onClick={() => {
                        this.getServerList()
                        }}>load </button>
                    {this.state.serverList.map((server, index) => <div className="serverName" key={index} onClick={() => console.log(server)}><br />{server}</div>)}
                </div>
                <FirebaseAuthProvider firebase={firebase} {...fcfg}>
                    <button className="signoutnav" onClick={() => firebase.auth().signOut()}></button>
                </FirebaseAuthProvider>
            </nav>
        )
    }
}

export default navbar