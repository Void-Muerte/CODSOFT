import { decodeToken } from "@utils/Tokens";
import { AuthUser } from "@utils/types";
import React, { useState, createContext, useContext } from "react";

const AuthContext = createContext<{
  auth: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
} | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const ACCESS: string = import.meta.env.VITE_ACCESS;
  const accessToken = localStorage.getItem(ACCESS);
  let userIn: AuthUser | null = null;
  if (accessToken) {
    userIn = decodeToken(accessToken);
  }
  const [auth, setAuth] = useState<AuthUser | null>(userIn);

  const login = (user: AuthUser) => {
    setAuth(user);
  };
  const logout = () => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("Use context within the provider");
  }
  return context;
};
// eslint-disable-next-line react-refresh/only-export-components
export default useAuthContext;
