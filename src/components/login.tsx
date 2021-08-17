import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { auth, googleLogin, signout } from "../firebase/firebase";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <div>
      <AuthContext.Provider value={value}>
        <button disabled={loading} onClick={userLogin}>
          login
        </button>
        <button disabled={loading} onClick={userSignout}>
          sign out
        </button>
        {user && <Link to="/app">app</Link>}
        <pre>{user && JSON.stringify(user, null, 2)}</pre>
      </AuthContext.Provider>
      <DragDropContext onDragEnd={(result) => console.log(result)}>
        <Droppable droppableId="sus">
          {(provided) => (
            <div
              className="something"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Draggable key={"1"} draggableId={"1"} index={1}>
                {(provided) => (
                  <p
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    hello1
                  </p>
                )}
              </Draggable>
              <Draggable key={"2"} draggableId={"2"} index={2}>
                {(provided) => (
                  <p
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    hello2
                  </p>
                )}
              </Draggable>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}