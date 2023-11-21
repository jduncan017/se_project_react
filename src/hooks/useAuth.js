// useAuth.js
import { useState, useContext, useEffect, useCallback } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../utils/api";
import { login as loginConfig, signup as signupConfig } from "../utils/auth";

const useAuth = (toggleModal) => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [serverResponse, setServerResponse] = useState("");

  const handleLogin = async ({ email, password }) => {
    try {
      const config = loginConfig(email, password);
      const res = await api("AUTH", "signin", "", config);
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        fetchUserInfo(res.token);
        toggleModal("login");
      }
    } catch (error) {
      console.error(error);
      setServerResponse(error.message);
    }
  };

  const handleSignup = async ({ name, avatar, email, password }) => {
    try {
      const config = signupConfig(name, avatar, email, password);
      await api("AUTH", "signup", "", config);
      await handleLogin({ email, password });
      toggleModal("signup");
    } catch (error) {
      console.error(error);
      setServerResponse(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentUser({ avatar: "P R" });
    toggleModal("logout");
  };

  const fetchUserInfo = useCallback(
    async (token) => {
      try {
        const userInfo = await api("GET", "user/me", token);
        setCurrentUser(userInfo);
      } catch (error) {
        console.error("Can't access user", error);
      }
    },
    [setCurrentUser]
  );

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsLoggedIn(true);
      fetchUserInfo(token);
    }
  }, [fetchUserInfo, setIsLoggedIn]);

  return { handleLogin, handleSignup, handleLogout, serverResponse };
};

export default useAuth;
