import React, { useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { auth } from "../../firebase/firebase";
import firebase from "firebase/app";

// Components
import Chat from "./chat";
import Navbar from "./navbar";

// CSS
import "../../styles/app/app.scss";

// Props
interface props {}

function app() {
  const [user, setUser] = useState<any>(null);
  const [servers, setServers] = useState<string[]>();
  const [currServer, setCurrServer] = useState<string>();
  const [currChannel, setCurrChannel] = useState<number>(0);
  const [userTag, setUserTag] = useState()
  const value = {
    user,
    setUser,
    servers,
    setServers,
    currServer,
    setCurrServer,
    currChannel,
    setCurrChannel,
    userTag,
    setUserTag,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      <div className="app">
        <Navbar />
        <Chat />
      </div>
    </AuthContext.Provider>
  );
}

export default app;
