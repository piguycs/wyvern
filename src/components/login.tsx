import React, { useContext, useEffect } from "react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

export default function login() {
  useEffect(() => {}, []);
    console.log(useAuth());
  return (
    <AuthProvider>
      <button onClick={useAuth}>hmmm</button>
    </AuthProvider>
  );
}
