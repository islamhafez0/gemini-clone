import { useContext } from "react"
import { AppContext } from '../context/AppContext';

export const useAppContext = () => {
  const context = useContext(AppContext);
  if(!context) {
    throw new Error("App Context must be used within a provider")
  }
  return context;
}