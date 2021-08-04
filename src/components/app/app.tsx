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
  const value = { user, setUser };

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
