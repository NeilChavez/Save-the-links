import { createContext, useState } from "react";
const authContext = createContext();

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(() =>
    window.sessionStorage.getItem("accessToken")
  );

  const [userData, setUserData] = useState(() =>
    JSON.parse(window.sessionStorage.getItem("userData")));

  return (
    <authContext.Provider value={{ token, setToken, userData, setUserData }}>
      {children}
    </authContext.Provider>
  );
}

export default authContext;
export { AuthContextProvider };
