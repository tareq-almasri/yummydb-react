import React, { useState, createContext } from "react";

export const ApiContext = createContext();

export const ApiProvider = props => {
  const [query, setQuery] = useState("");

  return (
    <ApiContext.Provider value={[query, setQuery]}>
      {props.children}
    </ApiContext.Provider>
  );
};
