import { useContext } from "react";
import authContext from "../context/authContext";

export function useAuthContext() {
  const { userData, setUserData, token, setToken, error, setError } = useContext(authContext);
  
  return {
    userData,
    setUserData,
    token,
    setToken,
    isLogged: Boolean(token),
    error, 
    setError
  };
}
