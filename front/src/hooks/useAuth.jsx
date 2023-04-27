import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useContext(UserContext);

  //const [accessToken, setAccessToken] = useState({ value: "", expire: "" });
  //const [refreshToken, setRefreshToken] = useState({ value: "", expire: "" });

  const [accessToken, setAccessToken] = useState(retrieveAccessToken());
  const [refreshToken, setRefreshToken] = useState(retrieveRefreshoken());

  const navigate = useNavigate();

  function authorizationHandler(credentials) {
    if (credentials) return passwordHandler(credentials);
    if (accessToken.value != "") return accessTokenHandler();
    setAuthorized(false);
  }

  function passwordHandler(credentials) {
    console.log("PASSWORD HANDLER");
    //console.log(credentials);

    localStorage.setItem(
      "API_REFRESH",
      JSON.stringify({ value: "sdfsdfsd", expire: Date.now() + 604800000 })
    ); //from API
    sessionStorage.setItem(
      "API_ACCESS",
      JSON.stringify({ value: "fdgdfgdf", expire: Date.now() + 3600000 })
    ); //from API

    //console.log(accessToken);
    //console.log(refreshToken);
  }

  function accessTokenHandler() {
    console.log("ACCESS TOKEN HANDLER");
    console.log(Date.now());
    if (accessToken.expire > Date.now()) return console.log("EXPIRED");
    console.log("NOT EXPIRED");
  }

  function refreshTokenHandler() {
    console.log("REFRESH TOKEN HANDLER");
  }

  function retrieveAccessToken() {
    if (sessionStorage.getItem("API_ACCESS")) {
      //setAccessToken(JSON.parse(sessionStorage.getItem("API_ACCESS")));
      return JSON.parse(sessionStorage.getItem("API_ACCESS"));
    }
    return { value: "", expire: "" };
  }

  function retrieveRefreshoken() {
    if (localStorage.getItem("API_REFRESH")) {
      //setRefreshToken(JSON.parse(localStorage.getItem("API_REFRESH")));
      return JSON.parse(localStorage.getItem("API_REFRESH"));
    }
    return { value: "", expire: "" };
  }

  useEffect(() => {
    console.log(`%cACCESS ${TempConverter(accessToken.expire)}`, "color: red");
    console.log(
      `%cREFRESH ${TempConverter(refreshToken.expire)}`,
      "color: yellow"
    );
    console.log(accessToken.expire - Date.now());
  }, []);

  function TempConverter(value) {
    const date = new Date(value);
    return date.toDateString();
  }

  /*
  function authorizationHandler(credentials) {
    console.log(accessToken);
    console.log(refreshToken);

    if (!credentials) {
      if (accessToken.expire) console.log("first");
      tokenHandler();
      return;
    }

    if (credentials.Password) {
      setAuthorized(true);
      getUser();
      localStorage.setItem(
        "API_REFRESH",
        JSON.stringify({ value: "sdfsdfsd", expire: Date.now() + 604800000 })
      ); //from API
      sessionStorage.setItem(
        "API_ACCESS",
        JSON.stringify({ value: "fdgdfgdf", expire: Date.now() + 3600000 })
      ); //from API
      return;
    }
  }

  function tokenHandler() {
    if (accessToken.expire > Date.now()) {
      refreshTokenHandler();
    }
    setAuthorized(true);
    getUser();
    return;
  }

  function refreshTokenHandler() {
    console.log("TOKEN_REFRESH");
    if (refreshToken.expire > Date.now()) {
      return navigate("/login");
    }

    setAccessToken({ value: "sdfsdfsd", expire: Date.now() + 3600000 });
    localStorage.setItem(
      "API_ACCESS",
      JSON.stringify({ value: "sdfsdfsd", expire: Date.now() + 604800000 })
    );
  }

  function getUser() {
    setUser({
      Login: "fgtft",
      Name: "Humfrid",
      Surname: "MacMakin",
      AccessLevel: 1,
    });
  }*/

  return [authorized, authorizationHandler];
}
