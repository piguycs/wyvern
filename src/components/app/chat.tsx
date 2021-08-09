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
  const [newMsgDataList, setNewMsgDataList] = useState<any[]>([]);
  const [newMessages, setNewMessages] = useState<JSX.Element[]>([]);
  const [socket] = useState(io("https://Wyvern-API.huski3.repl.co/api/chat"));

  useEffect(() => {
    setLocationName(serverName + " /" + channelName);
  }, [serverName, channelName]);

  // Gets server name
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
      setNewMsgDataList((newMsgDataList) => [...newMsgDataList, data]);
      console.log("new message:", data);
    });
  }, [socket]);

  // Append new messages to the render
  // Also group messages from same sender
  useEffect(() => {
    var listlen = newMsgDataList.length;
    setNewMessages((x) => [
      ...x,
      <div className="message-div" key={"m_" + (listlen - 1)}>
        {listlen > 1 ? (
          newMsgDataList[listlen - 2].id ==
          newMsgDataList[listlen - 1].id ? null : (
            <div>
              {/* <img draggable={false} src={user?.photoURL} /> */}
              <b className="name">{newMsgDataList[listlen - 1]?.username[0]}</b>
            </div>
          )
        ) : (
          <div>
            {/* <img draggable={false} src={user?.photoURL} /> */}
            <b className="name">{newMsgDataList[listlen - 1]?.username[0]}</b>
          </div>
        )}
        <p id={"m_" + (listlen - 1)} className="message">
          {newMsgDataList[listlen - 1]?.content}
        </p>
      </div>,
    ]);
    document.getElementById("m_" + (listlen - 1))?.scrollIntoView();
  }, [newMsgDataList]);

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
        <div className="chatHistory">
          {newMessages}
        </div>

        {<div className={undefined && "typing-indicator"}></div>}
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
