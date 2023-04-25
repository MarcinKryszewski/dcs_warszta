import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({ Login: "", Name: "", Surname: "" });
  const [isAuth, setIsAuth] = useState(false);

  const value = {
    user,
    setUser,
    isAuth,
    setIsAuth,
  };

  function userHandler(userData) {
    setUser(userData);
  }

  function authHandler(value, userData) {
    setIsAuth(value);
    sessionStorage.setItem("apitoken", value);
    if (value == true) sessionStorage.setItem("user", JSON.stringify(user));
    if (value == false) sessionStorage.setItem("user", "");
  }

  return (
    <UserContext.Provider value={[user, userHandler, isAuth, authHandler]}>
      {children}
    </UserContext.Provider>
  );
}
