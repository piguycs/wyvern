import React, { useState } from 'react'
import io from "socket.io-client"

// THIS CONNECTS TO THE FUCKING API
const socket = io("https://Wyvern-API.huski3.repl.co/api/chat")

// THIS IS ME TALKING TO MYSELF COZ FML


// THIS IS THE SHIT WHICH DOES NOT FUCKING WORK
socket.on('connect', () => {
    socket.emit('joined', { 'serverchannel': 120 })
    console.log("Connected")
})

function socketio() {
    const [hello, setCount] = useState("0")
    socket.on('message', (data) => {
        setCount(data.content)
        console.log(data.content)
    })
    return (
        <div>
            <h1>{hello}</h1>
        </div>
    )
}

export default socketio