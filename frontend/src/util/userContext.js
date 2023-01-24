import React, { useState, createContext, useEffect } from "react";
import Client from "./Client";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  let [user, setUser] = useState(null);

  async function fetchUser() {
    let currentUser = await Client.getUser();
    console.log("provider useeffect get user", currentUser);
    setUser(currentUser);
  }

  if (user == undefined) {
    fetchUser();
  }

  useEffect(() => {});

  let login = async (userEmail, userLogin) => {
    let newUser = await Client.loginUser(userEmail, userLogin);
    if (newUser != null) {
      setUser(newUser);
      console.log("success");
    } else {
      console.log("login fail");
    }
  };

  let logout = async () => {
    await Client.logoutUser();
    setUser(0);
    console.log("logout");
  };

  let value = { user, login, logout };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
