import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext); // To consume the context value in other components

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

  return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>; // To provide the context value
};
