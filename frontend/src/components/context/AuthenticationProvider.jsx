//step1 : context 만들기
import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

//step1: context 만들기
export const AuthenticationContext = createContext(null);

function AuthenticationProvider({ children }) {
  // const [id, setId] = useState("");
  const [userToken, setUserToken] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserToken(decoded);
    }
  }, []);

  //login하는 함수
  function login(token) {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUserToken(decoded);
  }

  //logout 하는 함수
  function logout() {
    localStorage.removeItem("token");
    setUserToken({});
  }

  function hasAccess(id) {
    return id === userToken.sub;
  }

  const isAuthenticated = Date.now() < userToken.exp * 1000;

  let isAdmin = false;

  console.log(userToken);
  if (userToken.scope) {
    isAdmin = userToken.scope.split(" ").includes("admin");
  }

  return (
    <AuthenticationContext.Provider
      value={{
        id: userToken.sub,
        login,
        logout,
        isAuthenticated,
        isAdmin,
        hasAccess,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationProvider;
