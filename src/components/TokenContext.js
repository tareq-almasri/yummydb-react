import React, { createContext, useState, useEffect } from "react";

export const TokenContext = createContext();

export const TokenProvider = (props) => {
  const [token, setToken] = useState(() => {
    const localData = localStorage.getItem("token");
    return localData;
  });

  useEffect(() => {
    if (token) {
      fetch("https://yummydb-api.herokuapp.com/check-token", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data === "expired") {
            setToken(null);
            localStorage.removeItem("token");
          } else {
            localStorage.setItem("token", token);
          }
        });
    }
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {props.children}
    </TokenContext.Provider>
  );
};
