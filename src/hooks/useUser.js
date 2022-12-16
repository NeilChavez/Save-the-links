import { useState, useCallback } from "react";
import { useAuthContext } from "./useAuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase.js";
import { useNavigate } from "react-router-dom";

export function useUser() {
  const { token, setToken, setUserData, error, setError } = useAuthContext();
  const [msgError, setMsgError] = useState("");
  const navigate = useNavigate();

  const register = useCallback(
    async (email, password) => {
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
        if (err.code === "auth/email-already-in-use") textMessage = "This email is already in use";
        if (err.code === "auth/email-already-exists") textMessage = "This email already exists";
        if (err.code === "auth/missing-email") textMessage = "Insert a email";
        if (err.code === "auth/invalid-email") textMessage = "You need to insert a valid email";
        if (err.code === "auth/wrong-password") textMessage = "The password is wrong";
        if (err.code === "auth/invalid-password") textMessage = "The password is not valid";
        if (err.code === "auth/too-many-requests") textMessage = "To many requests :(";
        if(err.code === "auth/weak-password") textMessage = "Your password is weak"
        if (!textMessage) textMessage = "Something went wrong :("
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
        if (err.code === "auth/wrong-password") textMessage = "The password is wrong";
        if (err.code === "auth/invalid-password") textMessage = "The password is not valid";
        if (err.code === "auth/too-many-requests") textMessage = "Too many requests :(";
        if (!textMessage) textMessage = "Something went wrong :("
        setMsgError(textMessage)

      }
    },
    [setToken, setUserData, setError]
  );
  // Login with Google
  const signInWithGoogle = useCallback(async () => {
    try {
      const data = await signInWithPopup(auth, provider)
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
      if (err.code === "auth/missing-email") textMessage = "Insert a email";
      if (err.code === "auth/invalid-email") textMessage = "You need to insert a valid email";
      if (err.code === "auth/wrong-password") textMessage = "The password is wrong";
      if (err.code === "auth/invalid-password") textMessage = "The password is not valid";
      if (err.code === "auth/too-many-requests") textMessage = "Too many requests :(";
      if (!textMessage) textMessage = "Something went wrong :("
      setMsgError(textMessage)
    }
  }, [setUserData, navigate, setError, setToken])
  const logout = useCallback(async () => {
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
      if (err.code === "auth/too-many-requests") textMessage = "Too many requests :(";
      
      setMsgError(textMessage)
    }
  }, [setToken, navigate, setUserData, setError]);

  return {
    register,
    login,
    logout,
    signInWithGoogle,
    isLogged: Boolean(token),
    setToken,
    error,
    setError,
    msgError
  };
}
