import React, { useState, createContext, useEffect } from "react";
import Client from "./Client";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  let [user, setUser] = useState(null);

  async function fetchUser() {
    let currentUser = await Client.getUser();
    setUser(currentUser);
  }

  useEffect(() => {
    if (user == null) {
      fetchUser();
    }
  }, [user]);

  let login = async (userEmail, userLogin) => {
    let newUser = await Client.loginUser(userEmail, userLogin);
    if (newUser != null) {
      setUser(newUser);
      return newUser;
    }
    // TODO: error toast
  };

  let logout = async () => {
    let response = await Client.logoutUser();
    setUser(null);
    console.log("logout");
  };

  let value = { user, login, logout };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
