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

interface coords {
    x: number,
    y: number
}

function ContextMenu({ x, y }: coords) {
    return (
        <div style={{ top: y+"px", left: x+"px", position: "absolute" }} className="contextMenu">
            <div className="cmItem">Option 1</div>
            <div className="cmItem">Option 2</div>
            <div className="cmItem">Option 3</div>
            <div className="cmItem">Option 4</div>
            <div className="cmItem">Option 5</div>
        </div>
    )   
}

function socketio() {
    const [lastmsg, setlastmsg] = useState<Array<string>>([])
    const [socket] = useState(io("https://Wyvern-API.huski3.repl.co/api/chat"))
    const [location, setlocation] = useState<number>(120)
    const [newMessages, setNewMessages] = useState<JSX.Element[]>()

    const [token, setToken] = useState<string | null>(null)
    const [channel, setChannel] = useState(120)


    let tempmsg:Array<string>

    // Runs when components are rendered to dom
    useEffect(() => {       
        socket.on('connect', () => {
            socket.emit('joined', { 'serverchannel': location })
            console.log("Connected")
        })

        document.getElementById(("h_" + (historyLength-1)).toString())!.scrollIntoView()

    }, [])

    // context menu stuff
    const [showContextMenu, setCMState] = useState(false)
    const [posX, setX] = useState(0)
    const [posY, setY] = useState(0)
    useEffect(() => {
        const customContextArea = document.getElementById('chathistory')
        customContextArea!.addEventListener("contextmenu", (event) => {
            event.preventDefault()
            setX(event.clientX)
            setY(event.clientY)
        })
        customContextArea!.oncontextmenu = function() { setCMState(true) }
        window.onpointerdown = function () { setCMState(false) }

    }, [])

    // socket.io connect/on message etc
    useEffect(() => {
        socket.on('message', (data:data) => {
            tempmsg = lastmsg
            tempmsg.push(data.content)
            setlastmsg(tempmsg)
            console.log("Message recieved:", data.content)
            setNewMessages(lastmsg.map((msg, index) => <p id={"m_" + index.toString()} className="messages" key={index}>{msg}</p>))
            document.getElementById(("m_"+(lastmsg.length-1)).toString())!.scrollIntoView()
        })
    }, [socket, location])

    useEffect(() => {
        setToken(localStorage.getItem('uid')!)
    }, [localStorage.getItem('uid')])

    // Part to send messages
    const [message, setMessage] = useState<string>("")
    function sendMessage(event: any) {
        if (message != "") {
            socket.emit('text', {
                'token': token, // Set this per user
                'serverchannel': channel, // where the message was sent
                'content': message, // can be left unchanged
                "type": "text" // this should be changed depending on the type of input
            })
        }
        setMessage("")
        event.preventDefault()
    }

    return (
        <div>
            <div id="chathistory" className="chathistory">
                {displayHistory}
                {newMessages}
            </div>
            <div className="messageBox">
                <form onSubmit={sendMessage}>
                    <input className="inputmsg" type="text" value={message} onChange={event => setMessage(event.target.value)} />
                    {/* <input type="submit" value="send" /> */}
                </form>
            </div>
            {showContextMenu ? <ContextMenu x={posX} y={posY} /> : null}
        </div>
    )
}

export default socketio