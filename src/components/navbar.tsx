import React, { createContext, useEffect, useState } from "react"

import '../styles/navbar.css'

import firebase from "firebase/app"
import "firebase/auth"

function navbar(props:any) {
    let serverList:Array<string> = props.serverList
    const [selectedServer, setServer] = useState(serverList[0])
    useEffect(() => {
        localStorage.setItem('server', selectedServer)
    }, [selectedServer])
    return (
        <nav className="navbar">
            <p className="branding">Wyvren</p>
            <div className="serverList">
                {serverList.map((serverNumber: any, index: any) => <div className="serverName" onClick={() => setServer(serverNumber)} key={index}>{serverNumber}</div>)}
            </div>
            <button className="signoutnav" onClick={() => { firebase.app().auth().signOut(); localStorage.removeItem('uid') }}></button>
        </nav>
    )
}

export default navbar