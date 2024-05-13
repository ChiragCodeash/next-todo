"use client";

import { ReactNode, createContext } from "react";

export const Context = createContext({ user: {} , name : "" });

export const ContextProvider = ({ children }:{ children: any }) => {
  return (
    <Context.Provider
      value={{ user: {} , name : "Chirag" }}
    >
      {children}
    </Context.Provider>
  );
};
