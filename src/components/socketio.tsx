import React, { useEffect, useState } from 'react'
import io from "socket.io-client"

import '../styles/chat.css'

interface data {
    content:string,
    id:number,
    serverchannel:number,
    type:string,
    username:Array<string>,
    flags?:Array<number>
}

async function getHistory(): Promise<Array<string>> {
    // Token yet to be implimented api-side
    var api_url = "https://wyvern-api.huski3.repl.co/api/"+120+"/history?token=token"

    const response = await fetch(api_url)
    const data = await response.json()

    return data.map((msg: any) => msg.content)
}

const chatHistory = await getHistory()
const displayHistory: JSX.Element[] = chatHistory.map((msg: string, index: number) => <p id={"h_" + index} className={"messages"} key={index}>{msg}</p>)
let historyLength: number = chatHistory.length

function socketio() {
    const [lastmsg, setlastmsg] = useState<Array<string>>([])
    const [socket] = useState(io("https://Wyvern-API.huski3.repl.co/api/chat"))
    const [location, setlocation] = useState<number>(120)
    const [newMessages, setNewMessages] = useState<JSX.Element[]>()

    let tempmsg:Array<string>

    // Runs when components are rendered to dom
    useEffect(() => {
        document.getElementById(("h_" + (historyLength-1)).toString())!.scrollIntoView()
    }, [])

    useEffect(() => {
        socket.on('connect', () => {
            socket.emit('joined', { 'serverchannel': location })
            console.log("Connected")
        })

        socket.on('message', (data:data) => {
            tempmsg = lastmsg
            tempmsg.push(data.content)
            setlastmsg(tempmsg)
            console.log("Message recieved:", data.content)
            setNewMessages(lastmsg.map((msg, index) => <p id={"m_" + index.toString()} className="messages" key={index}>{msg}</p>))
            document.getElementById(("m_"+(lastmsg.length-1)).toString())!.scrollIntoView()
        })
    }, [socket, location])

    return (
        <div>
            <div className="chathistory">
                {displayHistory}
                {newMessages}
            </div>
        </div>
    )
}

export default socketio