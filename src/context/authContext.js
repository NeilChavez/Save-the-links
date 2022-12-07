import { createContext, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
 const authContext = createContext();
const auth = getAuth();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

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
    <authContext.Provider value={{ user, register, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export default authContext
export {AuthContextProvider}
