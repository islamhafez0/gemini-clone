import { ReactNode, createContext } from "react";
import { firebaseConfig } from "../config/firebaseConfig";
import { initializeApp } from "firebase/app";
import { FirebaseContextProps } from "../interface";

export const FirebaseContext = createContext<FirebaseContextProps | undefined>(
  undefined
);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const app = initializeApp(firebaseConfig);
  if (!app) {
    throw new Error("Failed to initialize Firebase app");
  }
  return (
    <FirebaseContext.Provider value={{ app }}>
      {children}
    </FirebaseContext.Provider>
  );
};
