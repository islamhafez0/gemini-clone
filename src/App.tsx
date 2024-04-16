import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import MainApp from "./components/MainApp";
import CreateAccount from "./components/CreateAccount";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </>
  );
}

export default App;
