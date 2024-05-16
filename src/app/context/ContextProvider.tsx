"use client";

import { usePathname } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";

export type Context = {
  toggleDarkMode : ()=> void;
  darkMode : boolean | string
}

export const Context = createContext<Context | null>(null);

export const ContextProvider = ({ children }:{ children: any }) => {
  const [darkMode , setDarkMode] = useState((localStorage.getItem("darkMode")) || false)
  

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  useEffect(()=>{
    localStorage.setItem('darkMode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },[darkMode])

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
  return (
    <Context.Provider
      value={{toggleDarkMode , darkMode }}
    >
      {children}
    </Context.Provider>
  );
};
