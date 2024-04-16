import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ApplicationProvider from "./context/AppProvider.tsx";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ApplicationProvider>
      <App />
    </ApplicationProvider>
  </BrowserRouter>
);
