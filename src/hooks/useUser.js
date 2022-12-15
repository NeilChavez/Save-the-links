import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export function useUser() {
  const { token, setToken, setUserData, error, setError } = useAuthContext();
  const [msgError, setMsgError] = useState("");
  const navigate = useNavigate();

  const register = useCallback(
    async (email, password) => {
      // gestisci l'errore TODO;
      try {
        const data = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const { user } = data;
        const accessToken = user.accessToken;
        window.sessionStorage.setItem("accessToken", accessToken);
        window.sessionStorage.setItem("userData", JSON.stringify(data));
        setToken(accessToken);
        setUserData(data);
        setError(false);
        navigate("/");
      } catch (err) {
        setError(true);
        let textMessage = "";
        if (err.code === "auth/email-already-exists") textMessage = "This email already exists";
        if (err.code === "auth/email-already-in-use") textMessage = "This email already is already in use";
        if (err.code === "auth/missing-email") textMessage = "Insert a email";
        if (err.code === "auth/invalid-email") textMessage = "You need to insert a valid email";
        if (err.code === "auth/invalid-password") textMessage = "The password is not valid";
        setMsgError(textMessage)
      }
    },
    [navigate, setToken, setUserData, setError]
  );

  const login = useCallback(
    async (email, password) => {
      try {
        const data = await signInWithEmailAndPassword(auth, email, password);
        const { user } = data;
        const accessToken = user.accessToken;
        window.sessionStorage.setItem("accessToken", accessToken);

        window.sessionStorage.setItem("userData", JSON.stringify(data));
        setToken(accessToken);
        setUserData(data);
        setError(false);
      } catch (err) {
        setError(true);
        let textMessage = "";
        if (err.code === "auth/email-already-exists") textMessage = "This email already exists";
        if (err.code === "auth/missing-email") textMessage = "Insert a email";
        if (err.code === "auth/invalid-email") textMessage = "You need to insert a valid email";
        if (err.code === "auth/invalid-password") textMessage = "The password is not valid";
        setMsgError(textMessage)

      }
    },
    [setToken, setUserData, setError]
  );
  const logout = useCallback(async () => {
    // gestisci l'errore TODO;
    try {
      await signOut(auth);
      window.sessionStorage.removeItem("accessToken");
      window.sessionStorage.removeItem("userData");
      setToken(null);
      setUserData(null);
      setError(false);
      navigate("/")
    } catch (err) {
      setError(true);
      let textMessage = "";
      if (err.code === "auth/email-already-exists") textMessage = "This email already exists";
      if (err.code === "auth/missing-email") textMessage = "Insert a email";
      if (err.code === "auth/invalid-email") textMessage = "You need to insert a valid email";
      if (err.code === "auth/invalid-password") textMessage = "The password is not valid";
      setMsgError(textMessage)
    }
  }, [setToken, navigate, setUserData, setError]);

  return {
    register,
    login,
    logout,
    isLogged: Boolean(token),
    setToken,
    error,
    msgError
  };
}
