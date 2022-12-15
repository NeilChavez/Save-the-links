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
  const { token, setToken, setUserData } = useAuthContext();
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

        navigate("/");
      } catch (err) {
        console.warn(err);
      }
    },
    [navigate, setToken, setUserData]
  );

  const login = useCallback(
    async (email, password) => {
      // gestisci l'errore TODO;
      try {
        const data = await signInWithEmailAndPassword(auth, email, password);
        const { user } = data;
        const accessToken = user.accessToken;
        window.sessionStorage.setItem("accessToken", accessToken);
        
        window.sessionStorage.setItem("userData", JSON.stringify(data));
        setToken(accessToken);
        setUserData(data);

      } catch (err) {
        console.warn(err);
      }
    },
    [setToken, setUserData]
  );
  const logout = useCallback(async () => {
    // gestisci l'errore TODO;
    try {
      await signOut(auth);
      window.sessionStorage.removeItem("accessToken");
      window.sessionStorage.removeItem("userData");
      setToken(null);
      setUserData(null);
      navigate("/")
    } catch (err) {
      console.warn(err);
    }
  }, [setToken, navigate, setUserData]);

  return {
    register,
    login,
    logout,
    isLogged: Boolean(token),
    setToken,
  };
}
