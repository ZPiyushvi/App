// GlobalStateContext.js
import React, { createContext, useState } from 'react';
export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [SelectSubscriptionPlan, setSelectSubscriptionPlan] = useState({ type: "Free",  bool: false});

  return (
    <GlobalStateContext.Provider value={{ SelectSubscriptionPlan, setSelectSubscriptionPlan }}>
      {children}
    </GlobalStateContext.Provider>
  );
};