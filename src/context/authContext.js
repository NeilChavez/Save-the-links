import { createContext, useState } from "react";
const authContext = createContext();

function AuthContextProvider({ children }) {
  const [error, setError] = useState(false);
  const [token, setToken] = useState(() =>
    window.sessionStorage.getItem("accessToken")
  );

  const [userData, setUserData] = useState(() =>
    JSON.parse(window.sessionStorage.getItem("userData")));
  return (
    <authContext.Provider value={{ token, setToken, userData, setUserData, error, setError }}>
      {children}
    </authContext.Provider>
  );
}

export default authContext;
export { AuthContextProvider };
