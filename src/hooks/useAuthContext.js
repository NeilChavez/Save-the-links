import { useContext } from "react";
import authContext from "../context/authContext";

export function useAuthContext() {
  const { user, setUser, register, login, logout } = useContext(authContext);
  // const {uid} = user; 
  return {
    user,
    // uid,
    setUser,
    register,
    login,
    logout,
    isLogged: Boolean(user),
  };
}
