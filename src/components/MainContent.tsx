import Header from "./Header";
import Home from "./Home";
import { useAppContext } from "../hooks/useAppContext";
import ChatForm from "./ChatForm";

const MainContent = () => {
  const { setToggleSidebar } = useAppContext();
  return (
    <main className="main">
      <div role="main">
        <Header setToggleSidebar={setToggleSidebar} />
        <Home />
      </div>
      <div className="chat_form-wrapper">
        <ChatForm />
      </div>
    </main>
  );
};

export default MainContent;
