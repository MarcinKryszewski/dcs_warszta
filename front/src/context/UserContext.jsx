import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    Login: "",
    Name: "",
    Surname: "",
    AccessLevel: 0,
  });

  const value = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}
