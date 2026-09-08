import { createContext, useState } from "react";
import { clearAuth, getStoredSession, persistSession } from "../utils/auth";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [session] = useState(getStoredSession);
  const [token, setToken] = useState(session.token);
  const [user, setUser] = useState(session.user);
  const [userType, setUsertype] = useState(session.user?.userType || "");

  const login = (nextToken, nextUser) => {
    persistSession(nextToken, nextUser);
    setToken(nextToken);
    setUser(nextUser);
    setUsertype(nextUser?.userType || "");
  };

  const logout = () => {
    clearAuth();
    setToken("");
    setUser("");
    setUsertype("");
  };

  return (
    <UserContext.Provider value={{ setUser, user, userType, setUsertype, token, setToken, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
