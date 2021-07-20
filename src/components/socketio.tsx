import React, { useEffect, useState } from 'react'
import io from "socket.io-client"

// THIS CONNECTS TO THE FUCKING API
const socket = io("https://Wyvern-API.huski3.repl.co/api/chat")

// Runs when connects to server
socket.on('connect', () => {
    console.log("Connected")
})

function socketio(props:any) {
    const [lastmsg, latestMsg] = useState("")
    const [display, setDisplay] = useState("")
    
    socket.on('message', (data) => {
        latestMsg(data.content)
    })
    
    useEffect(() => {
        setDisplay(lastmsg)
        console.log(display)
        }, [lastmsg]
    )

    return (
        <div>
            <div className="chathistory">
                <p>{display}</p>
                <p>{props.server}</p>
            </div>
        </div>
    )
}

export default socketio