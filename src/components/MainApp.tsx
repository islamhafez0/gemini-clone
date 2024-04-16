import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
const MainApp = () => {
  const { isAuth } = useAuthContext();

  return (
    <div className="app">
      {isAuth ? <Navigate to="/" /> : <Navigate to="/login" />}
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default MainApp;
