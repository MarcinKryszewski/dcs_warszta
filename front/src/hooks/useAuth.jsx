import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "@/context/UserContext";
import AuthContext from "@/context/AuthContext";

export default function useAuth() {
  const [authorized, setAuthorized] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { auth, setAuth } = useContext(AuthContext);

  const [accessToken, setAccessToken] = useState(retrieveAccessTokenStorage());
  const [refreshToken, setRefreshToken] = useState(
    retrieveRefreshTokenStorage()
  );

  const navigate = useNavigate();

  //const navigate = useNavigate();

  function authorizationHandler(credentials) {
    if (credentials) return passwordHandler(credentials);
    if (accessToken.value != "") return accessTokenHandler();
    if (refreshToken.value != "") return refreshTokenHandler();
    //setAuthorized(false);
    setAuth(false);
  }

  function passwordHandler(credentials) {
    retrieveAccessTokenAPI();
    retrieveRefreshTokenAPI();
    getUser();
    //setAuthorized(true);
    setAuth(true);
  }

  function accessTokenHandler() {
    if (accessToken.expire < Date.now()) return refreshTokenHandler();
    getUser();
    //setAuthorized(true);
    setAuth(true);
  }

  function refreshTokenHandler() {
    if (refreshToken.expire < Date.now())
      return console.log("EXPIRED GO TO LOGIN");
    retrieveAccessTokenAPI();
    getUser();
    //setAuthorized(true);
    setAuth(true);
  }

  function retrieveAccessTokenStorage() {
    if (sessionStorage.getItem("API_ACCESS")) {
      return JSON.parse(sessionStorage.getItem("API_ACCESS"));
    }
    return { value: "", expire: "" };
  }

  function retrieveRefreshTokenStorage() {
    if (localStorage.getItem("API_REFRESH")) {
      return JSON.parse(localStorage.getItem("API_REFRESH"));
    }
    return { value: "", expire: "" };
  }

  function retrieveAccessTokenAPI() {
    sessionStorage.setItem(
      "API_ACCESS",
      JSON.stringify({ value: "fdgdfgdf", expire: Date.now() + 3600000 })
    );
  }

  function retrieveRefreshTokenAPI() {
    localStorage.setItem(
      "API_REFRESH",
      JSON.stringify({ value: "eryfdsvbgdfjf", expire: Date.now() + 604800000 })
    );
  }

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
