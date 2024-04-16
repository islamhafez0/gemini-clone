import { useContext } from "react";
import { FirebaseContext } from "../context/FirebaseContext";

export const useFirebaseContext = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw Error("Firebase context must be used wthin provider.");
  }
  return context;
};
