import React from "react"

import '../styles/navbar.css'

import firebase from "firebase/app"
import "firebase/auth"

function navbar(props:any) {
    let serverList:Array<string> = props.serverList
    return (
        <nav className="navbar">
            <p className="branding">Wyvren</p>
            <div className="serverList">
                {serverList.map((serverNumber, index) => <div className="serverName" key={index}>{serverNumber}</div>)}
            </div>
            <button className="signoutnav" onClick={() => { firebase.app().auth().signOut() }}></button>
        </nav>
    )
}

export default navbar