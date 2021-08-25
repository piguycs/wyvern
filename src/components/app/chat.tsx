import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import io from "socket.io-client";
import ping from "../../assets/ping.wav";

import "../../styles/app/chat.scss";

function chat() {
  const { user, currServer, currChannel, setCurrChannel, userTag, pfp } =
    useContext(AuthContext);

  // local variables for chat.tsx
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // server info
  const [serverName, setServerName] = useState<string>("servername");
  const [channelList, setChannelList] = useState<any[]>();
  const [channelName, setChannelName] = useState<string>("channel");
  const [showChannels, setShowChannels] = useState(false);
  // Parsed version of
  const [locationName, setLocationName] = useState<string>();
  // Current message
  const [message, setMessage] = useState<string>("");
  const [newMsgDataList, setNewMsgDataList] = useState<any[]>([]);
  const [newMessages, setNewMessages] = useState<JSX.Element[]>([]);
  // history
  const [history, setHistory] = useState<any[]>([]);
  const [historyList, setHistoryList] = useState<JSX.Element[]>([]);
  // socketio
  const [socket] = useState(io("https://Wyvern-API.huski3.repl.co/api/chat"));
  // ping sound
  const [pingaudio, setPingaudio] = useState(new Audio(ping));

  useEffect(() => {
    return () => {
      console.log(`${currServer}${currChannel}`);
      socket.emit("left", {
        serverchannel: `${currServer}${currChannel}`,
      });
    };
  }, []);

  useEffect(() => {
    console.log(pfp);
  }, []);

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
    // setHistoryList([]);
    setHistory([]);
  }, [serverName, channelName]);

  // Gets server name
  async function getServerInfo() {
    var server_api = (id: string) =>
      "https://wyvern-api.huski3.repl.co/api/" +
      id +
      "/info?token=" +
      user?.uid;

    const response = await fetch(server_api(currServer));
    const data = await response.json();

    return {
      name: data.name,
      channels: data.channels?.map((channel: any) => channel.name),
    };
  }

  // Append new messages to the render
  // Also group messages from same sender
  function isConsecutive(
    prevID: null | number,
    currID: number,
    name: string,
    content: string = "hello",
    profilepic = "https://placekitten.com/200/200"
  ) {
    if (prevID != null && prevID == currID) {
      return <p className="message-cons">{content}</p>;
    } else {
      return (
        <div className="message-div-pfpgrid">
          <img className="chatpfp pfp-crop" src={profilepic} />
          <b className="username">{name}</b>
          <p className="message">{content}</p>
        </div>
      );
    }
  }

  async function getHistory() {
    var api_url =
      "https://wyvern-api.huski3.repl.co/api/" +
      `${currServer}${currChannel}` +
      "/history?token=" +
      user?.uid;

    const response = await fetch(api_url);
    const data = await response.json();

    return data
      .map((msg: any) => ({
        id: msg.author_id,
        username: msg.author_name[0],
        content: msg.content,
        pfp: msg.pfp[0][0],
      }));
  }

  async function computeHist() {
    // Gets the last few messages
    let histlist = await getHistory();
    let histlistJSX: any = [];
    // histlist now has a list of the past messages

    // .map here to go through every message on histlist
    // currmsg is the current msg to be converted to jsx
    histlist.map((currmsg: any, index: number) => {
      histlistJSX = [
        ...histlistJSX,
        <div className="message-div" id={"h_" + index} key={"h_" + index}>
          {
            // This line calls a function which does conditional rendering
            isConsecutive(
              histlist.len > 1 ? currmsg.id : null,
              currmsg.id,
              currmsg.username[0],
              currmsg.content,
              currmsg.pfp
            )
          }
        </div>,
      ];
    });
    setHistoryList(histlistJSX);

    // to clear up memory
    histlistJSX = histlist = [];

    // scrolls into view
    document.getElementById("h_49")?.scrollIntoView();
  }

  useEffect(() => {
    if (currServer != undefined && currChannel != undefined) {
      computeHist();
    }
  }, [currServer, currChannel]);

  useEffect(() => {
    currServer &&
      getServerInfo().then(({ name, channels }) => {
        setServerName(name);
        setChannelList(channels);
      });
  }, [currServer]);

  useEffect(() => {
    console.log(channelList);
  }, [channelList]);

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
        serverchannel: user.uid,
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
      console.log("ping", data);
      pingaudio.play();
    });
  }, [socket]);

  useEffect(() => {
    var listlen = newMsgDataList.length;
    if (listlen > 0) {
      setNewMessages((_) => [
        ..._,
        <div
          className="message-div"
          id={"m_" + listlen}
          key={"m_" + (listlen - 1)}
        >
          {
            // This line calls a function which does conditional rendering
            isConsecutive(
              listlen > 1 ? newMsgDataList[listlen - 2].id : null,
              newMsgDataList[listlen - 1].id,
              newMsgDataList[listlen - 1].username[0],
              newMsgDataList[listlen - 1].content,
              newMsgDataList[listlen - 1].pfp[0][0]
            )
          }
        </div>,
      ]);
    }
    document.getElementById("m_" + listlen)?.scrollIntoView();
  }, [newMsgDataList]);

  useEffect(() => {
    var c_hist = document.getElementById("c_hist");
    c_hist!.scrollTop = c_hist!.scrollHeight;
  }, [newMessages]);

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
        {isLoggedIn ? locationName : "user not logged in"}
      </div>
      {showChannels && <div className="channelSel">hello</div>}
      <div className="chat-div">
        <div className="flex_c_c">
          <div id="c_hist" className="chatHistory">
            {historyList}
            {newMessages}
          </div>
          <div className="channels">
            {channelList?.map((chname: string, index: number) => (
              <p key={index}>{chname}</p>
            ))}
          </div>
        </div>

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
