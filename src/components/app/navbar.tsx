import React, { useContext, useState } from "react";
import branding from "../../assets/branding.svg";
import { AuthContext } from "../../contexts/AuthContext";

import "../../styles/app/navbar.scss";

function navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState("none");

  return (
    <nav className="nav">
      <img className="branding" src={branding} alt="branding" />
      <div className="nav-div">
        Navbar
        {user && <img src={user.photoURL} className="user-pfp" />}
      </div>
    </nav>
  );
}

export default navbar;
