import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({ Login: "", Name: "", Surname: "", Token: "" });
  const [isAuth, setIsAuth] = useState(false);

  const value = {
    user,
    setUser,
    isAuth,
    setIsAuth,
  };

  return (
    <UserContext.Provider value={[user, setUser, isAuth, setIsAuth]}>
      {children}
    </UserContext.Provider>
  );
}
