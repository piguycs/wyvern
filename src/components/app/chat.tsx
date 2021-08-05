import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import io from "socket.io-client";

import "../../styles/app/chat.scss";

function chat() {
  const { user, currServer, currChannel, setCurrChannel } =
    useContext(AuthContext);

  // local variables for chat.tsx
  const [serverName, setServerName] = useState<string>("servername");
  const [channelName, setChannelName] = useState<string>("channel");
  const [locationName, setLocationName] = useState<string>();
  const [message, setMessage] = useState<string>("");
  const [showChannels, setShowChannels] = useState(false);
  const [socket] = useState(io("https://Wyvern-API.huski3.repl.co/api/chat"));

  useEffect(() => {
    setLocationName(serverName + " /" + channelName);
  }, [serverName, channelName]);

  async function getServerName() {
    var server_api = (id: string) =>
      "https://wyvern-api.huski3.repl.co/api/" +
      id +
      "/info?token=" +
      user?.uid;

    const response = await fetch(server_api(currServer));
    const data = await response.json();

    return data.name;
  }

  useEffect(() => {
    currServer && getServerName().then((name) => setServerName(name));
  }, [currServer]);

  // messages
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });
  }, []);

  useEffect(() => {
    if (currServer != null) {
      socket.emit("joined", {
        serverchannel: `${currServer}${currChannel}`,
      });
    }
  }, [currServer]);

  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data.content);
    });
  }, [socket]);

  // Input handeling
  window.onkeydown = () => document.getElementById("msgInpt")!.focus();
  function sendMessage(event: any) {
    if (message != "") {
      if (message != "") {
        socket.emit("text", {
          token: user?.uid, // Set this per user
          serverchannel: `${currServer}${currChannel}`, // where the message was sent
          content: message, // can be left unchanged
          type: "text", // this should be changed depending on the type of input
        });
      }
      setMessage("");
      event.preventDefault();
    }
    setMessage("");
    event.preventDefault();
  }

  return (
    <div id="main_area">
      <div
        className="chat-loc unsel"
        onClick={() => {
          currServer && setShowChannels(!showChannels);
        }}
      >
        {locationName}
      </div>
      {showChannels && <div className="channelSel">hello</div>}
      <div className="chat-div">
        <p>{currServer}</p>
        <div className="typing-indicator">Typing</div>
        <form className="msg-form" onSubmit={sendMessage} autoComplete="off">
          <input
            id="msgInpt"
            className="inputmsg"
            autoFocus={true}
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </form>
      </div>
    </div>
  );
}

export default chat;
