// GlobalStateContext.js
import React, { createContext, useState, useEffect } from 'react';
export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    setFeatures(mockcampus_home_popular)
    // try {
    //   const response = await fetch('https://fdbb94ad-4fe0-4083-8c28-aaf22b8d5dad.mock.pstmn.io/mockcampus/home/popular');
    //   if (!response.ok) {
    //     console.log('Network response was not ok');
    //   }
    //   const data = await response.json();
    //   console.log(data)
    //   setFeatures(data);
    //   if (!data) {
    //     console.log('Failed to parse response as JSON');
    //   }
    // } catch (error) {
    //   console.error("Error loading features:", error);
    // }
  };
  return (
    <GlobalStateContext.Provider value={{ features, setFeatures }}>
      {children}
    </GlobalStateContext.Provider>
  );
};