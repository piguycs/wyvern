import React, { useState } from "react";
import { auth, signout, googleLogin } from "./../firebase/firebase";

export default function signup() {
  async function apiCreateUser(
    email: string | null | undefined,
    username: string | null | undefined,
    token: string | undefined
  ) {
    var create_user =
      "https://wyvern-api.huski3.repl.co/api/auth/register" +
      `?email=${email}` +
      `&username=${username}` +
      `&token=${token}`;

    try {
      const response = await fetch(create_user);
      const data = await response.json();

      console.log("%cACCOUNT CREATED", "color: #6EFF30");
      console.log(await data.userid);


    } catch (err) {
      console.log(
        "%c300 %cUser already exists, signing out",
        "color: #FF2442",
        "color: #FFB830"
      );
      signout();
    }
  }

  function handleSignUp() {
    if (!auth.currentUser?.uid) {
      try {
        googleLogin().then((data) => {
          console.log(data.user?.email, data.user?.displayName, data.user?.uid);
          apiCreateUser(
            data.user?.email,
            data.user?.displayName,
            data.user?.uid
          );
        });
      } catch (err) {
        // if the error occured after user logged in
        if (auth.currentUser) {
          console.log("logging out");
          signout();
        }
      }
    } else {
      var askUser = confirm(
        "Another user is logged in\nwould you wanna log out?"
      );
      if (askUser == true) {
        signout();
      } else {
        window.location.href = "/app";
      }
    }
  }

  return (
    <div>
      <button onClick={handleSignUp}>Create Account</button>
    </div>
  );
}
