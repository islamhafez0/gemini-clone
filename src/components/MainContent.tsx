import Header from "./Header";
import Home from "./Home";
import { useAppContext } from "../hooks/useAppContext";

const MainContent = () => {
  const { setToggleSidebar } = useAppContext();
  return (
    <main className="main">
      <Header setToggleSidebar={setToggleSidebar} />
      <Home />
      <p className="copyright">&copy; Islam Hafez {new Date().getFullYear()}</p>
    </main>
  );
};

export default MainContent;
