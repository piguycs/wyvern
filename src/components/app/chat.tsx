import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import io from "socket.io-client";

import "../../styles/app/chat.scss";

import sysmsgimg from "../../assets/system-messages-yellow.svg";
import ping from "../../assets/ping.wav";

function chat() {
  const { user, currServer, currChannel, setCurrChannel } =
    useContext(AuthContext);

  // local variables for chat.tsx
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // server info
  const [channelIDList, setChannelIDList] = useState<any[]>();
  const [channelList, setChannelList] = useState<any[]>();
  const [serverName, setServerName] = useState<string>("servername");
  const [channelName, setChannelName] = useState<string>("channel");
  // Current message
  const [message, setMessage] = useState<string>("");
  const [newMsgDataList, setNewMsgDataList] = useState<any[]>([]);
  const [newMessages, setNewMessages] = useState<JSX.Element[]>([]);
  // history
  const [historyList, setHistoryList] = useState<JSX.Element[]>([]);
  // socketio
  const [socket] = useState(io("https://Wyvern-API.huski3.repl.co/api/chat"));
  // ping sound
  const [pingaudio] = useState(new Audio(ping));

  useEffect(() => {
    return () => {
      console.log(`${currServer}${currChannel}`);
      socket.emit("left", {
        serverchannel: `${currServer}${currChannel}`,
      });
    };
  }, []);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else setIsLoggedIn(false);
  }, [user]);

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
      id: data.channels?.map((channel: any) => channel.id),
    };
  }

  // A WIP FUNCTION (DO NOT FORGET I PUT THIS HERE)
  var sysid = 0
  function sysMsg(msg = "THIS IS A SYSTEM LOG", id:number) {
    return (
      <div
        className="message-div"
        id={"sysmsg_" + id}
        key={"sysmsg_" + id}
      >
        <div className="message-div-pfpgrid">
          <img
            src={sysmsgimg}
            className="chatpfp pfp-crop"
          ></img>
          <div>
            <b className="username">wyvrenman</b>
            <a
              className="hide"
              style={{ color: "aqua" }}
              onClick={() => {
                let currsysmsg = document.getElementById("sysmsg_" + id);
                currsysmsg!.style.display = "none";
              }}
            >
              hide
            </a>
          </div>
          <p className="message">{msg}</p>
        </div>
      </div>
    );
  }

  // Append new messages to the render
  // Also group messages from same sender
  function isConsecutive(
    prevID: null | number = null,
    currID: number | null = null,
    name: string | null = null,
    content: string | null = null,
    profilepic: string = "https://placekitten.com/200/200",
    isFirst: boolean = false
  ) {
    if (isFirst) {
      return <button key="h_load">LOAD HISTORY (WIP)</button>;
    }
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

    return data.map((msg: any) => ({
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

    // this code runs before reading history
    // hence can add any element to dom before history
    histlistJSX = [
      isConsecutive(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true
      ),
    ];

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

    // scrolls into view
    document.getElementById("h_" + (histlist.length - 1))?.scrollIntoView();

    // to clear up memory
    histlistJSX = histlist = [];
  }

  useEffect(() => {
    if (currServer != undefined && currChannel != undefined) {
      computeHist();
    }
  }, [currServer, currChannel]);

  useEffect(() => {
    currServer &&
      getServerInfo().then(({ name, channels, id }) => {
        setServerName(name);
        setChannelIDList(id);
        setChannelList(channels);
      });
  }, [currServer, currChannel]);

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
        // usertoken : user.uid
      });
      socket.emit("joined", {
        serverchannel: user.uid,
      });
    }
  }, [currServer, currChannel]);

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

    socket.on("status", (data) => {
      setNewMessages((_) => [..._, sysMsg(data.msg, sysid)]);
      sysid = sysid + 1;
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
  // send message
  function sendMessage(event: any) {
    if (message != "") {
      if (message != "") {
        console.log("message is:", message);
        socket.emit("text", {
          token: user?.uid, // Set this per user
          serverchannel: `${currServer}${currChannel}`, // where the message was sent
          content: message, // can be left unchanged
          type: "text", // this should be changed depending on the type of input
        });
      }
    }
    setMessage("");
    event.preventDefault();
  }

  function changeChannel(id: string, name: string) {
    setCurrChannel(id);
    setChannelName(name);
  }


  // {so index 0 will be server 0[and text in the index will be last channel],[]}
  // so if last channel in server 12 was general(id 1234)
  // {[]..12[1234]}

  const [lastChannel, setLastChannel] = useState(/*WIP*/);
  const [adsAreVisible, setAds] = useState<"hidden" | "visible">("visible");

  useEffect(() => {
    if (channelIDList) {
      setAds("hidden");
    }
  }, [channelIDList]);

  // clears some stuff from other rooms
  useEffect(() => {
    setNewMsgDataList([]);
    setNewMessages([]);
  }, [currServer, currChannel]);
  useEffect(() => {
    setChannelName("general");
  }, [currServer]);

  return (
    <div id="main_area">
      <div className="chat-loc unsel">
        {isLoggedIn ? serverName + " /" + channelName : "user not logged in"}
      </div>
      <div className="chat-div">
        <div className="flex_c_c">
          <div id="c_hist" className="chatHistory">
            {historyList}
            {newMessages}
          </div>
          <div className="channels">
            <div>
              {channelIDList?.map((chname: string, index: number) => (
                <p
                  id={chname}
                  key={index}
                  className="channelName"
                  onClick={(e: any) =>
                    changeChannel(e.target.id, channelList![index])
                  }
                >
                  {channelList && channelList[index]}
                </p>
              ))}
            </div>
            <div className="promotions" style={{ visibility: adsAreVisible }}>
              #AD
            </div>
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
