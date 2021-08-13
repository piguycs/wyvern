import React, { useContext, useState, useEffect } from "react";
import branding from "../../assets/branding.svg";
import { AuthContext } from "../../contexts/AuthContext";

import "../../styles/app/navbar.scss";

function navbar() {
  const { user, servers, setServers, setCurrServer, setUserTag } =
    useContext(AuthContext);

  const [dragId, setDragId] = useState();

  const handleDrag = (ev: any) => {
    setDragId(ev.currentTarget?.id);
  };

  useEffect(() => {
    user && getServers(user.uid);
  }, [user]);

  async function getServers(uid: string) {
    var usr_api = "https://wyvern-api.huski3.repl.co/api/real_user";

    const authHeader = new Headers();
    authHeader.append("X-Api-Key", uid);

    const response = await fetch(usr_api, { headers: authHeader });
    const data = await response.json();

    setUserTag(data.tag);
    setServers(data.servers);
  }

  function setSelServer(server: string) {
    setCurrServer(server);
  }

  return (
    <nav className="nav">
      <img
        draggable={false}
        className="branding"
        src={branding}
        alt="branding"
      />
      <div className="nav-div">
        <div className="server-list">
          {user ? (
            servers &&
            servers.map((x: any, index: number) => (
              <button
                id={"slb_" + index}
                key={"slb_" + index}
                draggable={true}
                onDragOver={(ev) => ev.preventDefault()}
                onDragStart={handleDrag}
                onDrop={handleDrag}
                className="serverBtn"
                onClick={() => setSelServer(x)}
              >
                {x}
              </button>
            ))
          ) : <b>loading...</b>}
        </div>

        {user && (
          <img draggable={false} src={user.photoURL} className="user-pfp" />
        )}
      </div>
    </nav>
  );
}

export default navbar;
