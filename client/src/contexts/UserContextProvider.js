import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [token, setToken]= useState('')
  const [user, setUser] = useState('');
  const [userType, setUsertype] = useState('')

  return (
    <UserContext.Provider value={{ setUser, user, userType, setUsertype, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
