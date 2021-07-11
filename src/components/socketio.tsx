import React from 'react'
import io from "socket.io-client"

// THIS CONNECTS TO THE FUCKING API
const socket = io("https://Wyvern-API.huski3.repl.co/api/chat")

// THIS IS ME TALKING TO MYSELF COZ FML
var hello = "0"

// THIS IS THE SHIT WHICH DOES NOT FUCKING WORK
socket.on('connect', () => {
    socket.emit('joined', { 'serverchannel': 4298340998734895 })
    console.log("Connected")
})
socket.on('message', (data) => {
    hello = "1"
    console.log(data)
})

function socketio() {
    return (
        <div>
            <h1>{hello}</h1>
        </div>
    )
}

export default socketio