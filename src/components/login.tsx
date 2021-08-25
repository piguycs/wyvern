import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { auth, googleLogin, signout } from "../firebase/firebase";

export default function login() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const value = { user, setUser };

  useEffect(() => {
    setUser(auth.currentUser);
    console.log(user);
  }, [/*called once*/])

  async function userLogin() {
    setLoading(true);
    try {
      await googleLogin();
      setLoading(false);
    } catch (err) {
      alert(err.message);
      console.log("ERR:", err.message);
      setLoading(false);
    }
  }

  async function userSignout() {
    setLoading(true);
    try {
      await signout();
      setLoading(false);
    } catch (err) {
      alert(err.message);
      console.log("ERR:", err.message);
      setLoading(false);
    }
  }

  async function fixPfp() {
    var api_pfp = `https://wyvern-api.huski3.repl.co/api/user/update/pfp?token=${user.uid}&url=${user.photoURL}`;
    try {
      const response = await fetch(api_pfp)
      const data = await response.json()
      console.log(data);
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function legacyAuth(event:any) {
    console.log(event)
    event.preventDefault();
  }

  return (
    <div>
      <AuthContext.Provider value={value}>
        <button disabled={loading} onClick={userLogin}>
          login
        </button>
        <button disabled={loading} onClick={userSignout}>
          sign out
        </button>
        <button disabled={loading} onClick={fixPfp}>
          fix pfp
        </button>
        {user && <Link to="/app">app</Link>}
        <pre>{user && JSON.stringify(user, null, 2)}</pre>
        {/* {!user && (
          <form>
            <input id="leg_auth_inpt" onSubmit={legacyAuth}></input>
          </form>
        )} */}
      </AuthContext.Provider>
    </div>
  );
}