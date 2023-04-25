import { useContext, useEffect, useState } from "react";

import { UserContext } from "@/context/UserContext";

export function Authorization(login, auto, password) {
  const [username, setUsername] = useState({ Name: "", Surname: "" });
  const [token, setToken] = useState("");
  const [auth, setAuth] = useState(false);

  const [user, setUser, isAuth, setIsAuth] = useContext(UserContext);

  useEffect(() => {
    setIsAuth(auth);

    if (auth) {
      setUser({
        Login: login,
        Name: username.Name,
        Surname: username.Surname,
        Token: token,
      });
    }
  }, [auth]);

  useEffect(()=>{
    if (!token && !sessionStorage.getItem("tokenAPI")) setToken(sessionStorage.getItem("tokenAPI"))
    authorizationHandler(auto, password)
  })

  function authorizationHandler(auto, password) {
    if (auto == false) {
      //login to server with login and password
      setUsername({ Name: "Humfrid", Surname: "MacMakin" }); //server res
      tokenHandler("dsnfhdshfhdsn"); //server res
      setAuth(true);
    }

    if (auto == true) {
      if (!token && !sessionStorage.getItem("tokenAPI")) return
      if (token) {} //login with context Token
      if (sessionStorage.getItem("tokenAPI")) {} //login with session storage token

      //login to server with token
      setUsername({ Name: "Humfrid", Surname: "MacMakin" }); //server res
      setAuth(true);
    }
  }

  function tokenHandler(tokenValue) {
    setToken(tokenValue);
    sessionStorage.setItem("tokenAPI", tokenValue);
  }
}
