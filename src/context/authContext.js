import { createContext, useState } from "react";
const authContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(() =>
    window.sessionStorage.getItem("accessToken")
  );
  const [loading, setLoading] = useState(false);

  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
}

export default authContext;
export { AuthContextProvider };
