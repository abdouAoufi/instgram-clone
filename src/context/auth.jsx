import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isLogged, setLogged] = useState(false);
  const [user, setUser] = useState({ userName: "", url: "" });
  return (
    <AuthContext.Provider
      value={{ isLogged, setLogged, user, setUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
