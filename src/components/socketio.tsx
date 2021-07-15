import React, { Component, useEffect, useState } from 'react'
import io from "socket.io-client"

// THIS CONNECTS TO THE FUCKING API
const socket = io("https://Wyvern-API.huski3.repl.co/api/chat")

// Runs when connects to server
socket.on('connect', () => {
    socket.emit('joined', { 'serverchannel': 120 })
    console.log("Connected")
})

function socketio() {
    const [lastmsg, latestMsg] = useState("")
    const [display, setDisplay] = useState("")
    socket.on('message', (data) => {
        latestMsg(data.content)
        console.log(data.content)
    })

    useEffect(
        () => {
            setDisplay(lastmsg)
        }, [lastmsg]
    )

    return (
        <div>
            <h1>{display}</h1>
        </div>
    )
}
export default socketio