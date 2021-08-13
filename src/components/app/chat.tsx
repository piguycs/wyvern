import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import io from "socket.io-client";

import "../../styles/app/chat.scss";

function chat() {
  const { user, currServer, currChannel, setCurrChannel, userTag } =
    useContext(AuthContext);

  // local variables for chat.tsx
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // server info
  const [serverName, setServerName] = useState<string>("servername");
  const [channelName, setChannelName] = useState<string>("channel");
  const [showChannels, setShowChannels] = useState(false);
  // Parsed version of
  const [locationName, setLocationName] = useState<string>();
  // Current message
  const [message, setMessage] = useState<string>("");
  const [newMsgDataList, setNewMsgDataList] = useState<any[]>([]);
  const [newMessages, setNewMessages] = useState<JSX.Element[]>([]);
  // history
  const [history, setHistory] = useState<any[]>();
  const [historyList, setHistoryList] = useState<JSX.Element[]>();
  // socketio
  const [socket] = useState(io("https://Wyvern-API.huski3.repl.co/api/chat"));

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else setIsLoggedIn(false);
  }, [user]);

  // Set Current location of the user on display
  useEffect(() => {
    setLocationName(serverName + " /" + channelName);
    setNewMsgDataList([]);
    setNewMessages([]);
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

  async function getHistory() {
    var api_url =
      "https://wyvern-api.huski3.repl.co/api/" +
      `${currServer}${currChannel}` +
      "/history?token=" +
      user?.uid;

    const response = await fetch(api_url);
    const data = await response.json();

    return data.map((msg: any) => msg);
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
      socket.emit("joined", {
        serverchannel: userTag,
      });
    }
  }, [currServer]);

  // socket
  useEffect(() => {
    socket.on("message", (data) => {
      setNewMsgDataList((newMsgDataList) => [...newMsgDataList, data]);
      console.log("new message:", data);
    });

    socket.on("pinged", (data) => {
      console.log("ping", data)
    })
  }, [socket]);

  // Append new messages to the render
  // Also group messages from same sender
  function isConsecutive(prevID: null | number, currID: number, name: string) {
    if (prevID != null && prevID == currID) {
      return null;
    } else {
      return <b>{name}</b>;
    }
  }

  useEffect(() => {
    var listlen = newMsgDataList.length;
    if (listlen > 0) {
      setNewMessages((_) => [
        ..._,
        <div className="message-div" key={"m_" + (listlen - 1)}>
          {isConsecutive(
            listlen > 1 ? newMsgDataList[listlen - 2].id : null,
            newMsgDataList[listlen - 1].id,
            newMsgDataList[listlen - 1].username[0]
          )}
          <p className="message">{newMsgDataList[listlen - 1].content}</p>
        </div>,
      ]);
      document.getElementById("m_" + (listlen - 1))?.scrollIntoView();
    }
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
        {isLoggedIn ?  locationName : "user not logged in"}
      </div>
      {showChannels && <div className="channelSel">hello</div>}
      <div className="chat-div">
        <div className="chatHistory">{newMessages}</div>

        {<div className={undefined && "typing-indicator"}></div>}
        {isLoggedIn && (
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
        )}
      </div>
    </div>
  );
}

export default chat;
