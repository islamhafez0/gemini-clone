import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
const ProtectedRoute = ({ element }: { element: ReactNode }) => {
  const { isAuth } = useAuthContext();
  return isAuth ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
