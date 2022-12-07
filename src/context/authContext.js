import { createContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase.js";
const authContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const register = (email, password) => {
    // ritorna una promessa, gestisci l'errore nella funzione dove la chiami TODO
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    // ritorna una promessa, gestisci l'errore nella funzione dove la chiami TODO
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    // ritorna una promessa, gestisci l'errore nella funzione dove la chiami TODO
    signOut(auth);
  };

  return (
    <authContext.Provider value={{ user, setUser, register, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export default authContext;
export { AuthContextProvider };
