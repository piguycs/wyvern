import React, { useEffect, useState } from "react"
import { fcfg } from "../../firebase/firebase"
import '../../styles/app/chat.scss'

function chat() {
  // local variables for chat.tsx
  const [serverName, setServerName] = useState<string>("Banana")
  const [channelName, setChannelName] = useState<string>("general")
  const [locationName, setLocationName] = useState<string>()
  const [message, setMessage] = useState<string>("")

  // DEV logs for firebase cfg
  useEffect(() => {
    console.log(fcfg)
  }, [/*When page renders*/])

  useEffect(() => {
    setLocationName(serverName + " /" + channelName)
  }, [serverName, channelName])


  // Input handeling
  window.onkeydown = () => document.getElementById("msgInpt")!.focus()
  function sendMessage(event: any) {
    if (message != "") { console.log(message) }
    setMessage("")
    event.preventDefault()
  }

  return (
    <div id="main_area">
      <div className="chat-loc unsel">
        {locationName}
      </div>
      <div className="chat-div">
        chat
        <form className="msg-form" onSubmit={sendMessage} autoComplete="off">
          <input id="msgInpt" className="inputmsg" autoFocus={true} type="text" value={message} onChange={event => setMessage(event.target.value)} />
        </form>
      </div>
    </div>
  )
}

export default chat