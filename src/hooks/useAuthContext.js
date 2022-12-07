import { useContext } from "react";
import authContext from "../context/authContext";

export function useAuthContext() {
  const { user, setUser, register, login, logout } = useContext(authContext);
  return { user, setUser, register, login, logout, isLogged: Boolean(user) };
}
