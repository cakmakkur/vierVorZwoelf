"use client";

import React, { createContext, useState, useContext } from "react";

interface HomepageContextProps {
  children: React.ReactNode;
}

type HomepageContextType = {
  showGigs: boolean;
  toggleShowGigs: (s: boolean) => void;
};

const HomepageContext = createContext<HomepageContextType | undefined>(
  undefined
);

export const HomepageProvider = ({ children }: HomepageContextProps) => {
  const [showGigs, setShowGigs] = useState(false);

  const toggleShowGigs = (s: boolean) => {
    setShowGigs(s);
  };
  const value: HomepageContextType = { showGigs, toggleShowGigs };

  return (
    <HomepageContext.Provider value={value}>
      {children}
    </HomepageContext.Provider>
  );
};

export const useHomepageContext = () => {
  const context = useContext(HomepageContext);
  if (context === undefined) {
    throw new Error(
      "useHomepageContext must be used within a HomepageProvider"
    );
  }
  return context;
};
