import React, { useState,useEffect } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = () => {
    window.localStorage.setItem("loginStatus", "true");
    setUser("user"); 
  };

  const logout = () => {
    window.localStorage.removeItem("loginStatus");
    setUser(null);
  };

  useEffect(() => {
    const status = window.localStorage.getItem("loginStatus");
    if (status === "true") {
      setUser("user"); 
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
