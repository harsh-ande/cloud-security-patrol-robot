// src/GlobalContext.js
import React, { createContext, useEffect, useState } from "react";

// Create the Context
export const GlobalContext = createContext();

// Create a Provider component
export const GlobalLSContext = ({ children }) => {
  // Initial value from localStorage or a default value
  const initialData = JSON.parse(localStorage.getItem("user")) || {};

  const [globalData, setGlobalData] = useState(initialData);

  //   // Update localStorage whenever globalData changes
  //   useEffect(() => {
  //     localStorage.setItem('user', JSON.stringify(globalData));
  //   }, [globalData]);

  return <GlobalContext.Provider value={{ globalData }}>{children}</GlobalContext.Provider>;
};
