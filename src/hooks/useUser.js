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
  const { user, setUser } = useAuthContext();
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
        setUser(accessToken);
        navigate("/");
      } catch (err) {
        console.warn(err);
      }
    },
    [navigate, setUser]
  );

  const login = useCallback(
    async (email, password) => {
      // gestisci l'errore TODO;
      try {
        const data = await signInWithEmailAndPassword(auth, email, password);
        const { user } = data;
        const accessToken = user.accessToken;
        setUser(accessToken);
        window.sessionStorage.setItem("accessToken", accessToken);
      } catch (err) {
        console.warn(err);
      }
    },
    [setUser]
  );
  const logout = useCallback(async () => {
    // gestisci l'errore TODO;
    try {
      await signOut(auth);
      window.sessionStorage.removeItem("accessToken");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.warn(err);
    }
  }, [setUser, navigate]);

  return {
    register,
    login,
    logout,
    isLogged: Boolean(user),
    setUser,
  };
}
