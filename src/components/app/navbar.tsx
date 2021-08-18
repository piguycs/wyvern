import React, { useContext, useState, useEffect } from "react";
import branding from "../../assets/branding.svg";
import { AuthContext } from "../../contexts/AuthContext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import "../../styles/app/navbar.scss";

function navbar() {
  const { user, servers, setServers, setCurrServer, setUserTag, setpfp } =
    useContext(AuthContext);

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
    setpfp(data.pfp);
  }

  function setSelServer(server: string) {
    setCurrServer(server);
  }

  function rearrange(result: any) {
    if (!result.destination) return;

    const items = Array.from(servers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setServers(items);
  }

  return (
    <DragDropContext onDragEnd={rearrange}>
      <nav className="nav">
        <img
          draggable={false}
          className="branding"
          src={branding}
          alt="branding"
        />
        <div className="nav-div">
          <Droppable droppableId="buttons">
            {(provided) => (
              <div
                className="server-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {servers?.map((x: any, index: number) => {
                  return (
                    <Draggable
                      key={index}
                      draggableId={index.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          id={"slb_" + index}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="serverBtn"
                          onClick={() => setSelServer(x)}
                        >
                          {x}
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {user && (
            <img draggable={false} src={user.photoURL} className="user-pfp" />
          )}
        </div>
      </nav>
    </DragDropContext>
  );
}

export default navbar;
