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
                {serverList.map((serverNumber:any, index:any) => <div className="serverName" key={index}>{serverNumber}</div>)}
            </div>
            <button className="signoutnav" onClick={() => { firebase.app().auth().signOut(); localStorage.removeItem('uid') }}></button>
        </nav>
    )
}

export default navbar