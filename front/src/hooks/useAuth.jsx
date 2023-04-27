import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useContext(UserContext);

  //const [accessToken, setAccessToken] = useState({ value: "", expire: "" });
  //const [refreshToken, setRefreshToken] = useState({ value: "", expire: "" });

  const [accessToken, setAccessToken] = useState(retrieveAccessTokenStorage());
  const [refreshToken, setRefreshToken] = useState(
    retrieveRefreshTokenStorage()
  );

  //const navigate = useNavigate();

  function authorizationHandler(credentials) {
    if (credentials) return passwordHandler(credentials);
    if (accessToken.value != "") return accessTokenHandler();
    if (refreshToken.value != "") return refreshTokenHandler();
    setAuthorized(false);
  }

  function passwordHandler(credentials) {
    console.log();
    retrieveAccessTokenAPI();
    sessionStorage.setItem(
      "API_ACCESS",
      JSON.stringify({ value: "fdgdfgdf", expire: Date.now() + 3600000 })
    ); //from API
    getUser();
    setAuthorized(true);
  }

  function accessTokenHandler() {
    if (accessToken.expire < Date.now()) return refreshTokenHandler();
    getUser();
    setAuthorized(true);
  }

  function refreshTokenHandler() {
    if (refreshToken.expire < Date.now()) return console.log("EXPIRED");
    retrieveAccessTokenAPI();
  }

  function retrieveAccessTokenStorage() {
    if (sessionStorage.getItem("API_ACCESS")) {
      //setAccessToken(JSON.parse(sessionStorage.getItem("API_ACCESS")));
      return JSON.parse(sessionStorage.getItem("API_ACCESS"));
    }
    return { value: "", expire: "" };
  }

  function retrieveRefreshTokenStorage() {
    if (localStorage.getItem("API_REFRESH")) {
      //setRefreshToken(JSON.parse(localStorage.getItem("API_REFRESH")));
      return JSON.parse(localStorage.getItem("API_REFRESH"));
    }
    return { value: "", expire: "" };
  }

  function retrieveAccessTokenAPI() {
    console.log("retrieveAccessTokenAPI");
    sessionStorage.setItem(
      "API_ACCESS",
      JSON.stringify({ value: "fdgdfgdf", expire: Date.now() + 3600000 })
    );
  }

  function retrieveRefreshTokenAPI() {}

  async function getUser() {
    await setUser({
      Login: "fgtft",
      Name: "Humfrid",
      Surname: "MacMakin",
      AccessLevel: 1,
    });
  }

  return [authorized, authorizationHandler];
}
