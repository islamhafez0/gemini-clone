import { ReactNode, createContext, useState } from "react";
import runChat from "../config/gemini";
import { ContextTypes } from "../interface";

export const AppContext = createContext<ContextTypes | undefined>(undefined);

type ProviderChildren = {
  children: ReactNode;
};

export const AppProvider = ({ children }: ProviderChildren) => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const onSentRequest = async () => {
    try {
      setLoading(true);
      setShowResults(true);
      setPrompt(input);
      const res = await runChat(input);
      const filteredRes = res.split("**");
      let newResponse = "";
      for (let i = 0; i < filteredRes.length; i++) {
        if (i === 0 || i % 2 != 1) {
          newResponse! += filteredRes[i];
        } else {
          newResponse! += "<b>" + filteredRes[i] + "</b>";
        }
      }
      const formattedRes = newResponse.split("*").join("<br />");
      setResponse(formattedRes);
    } catch (error) {
      setError("Something went wrong please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const openNewChat = () => {
    setShowResults(false);
    setResponse("");
    setPrompt("");
    setToggleSidebar(false);
    setError("");
  };

  const contextValue = {
    toggleSidebar,
    setToggleSidebar,
    input,
    setInput,
    showResults,
    setShowResults,
    loading,
    setLoading,
    error,
    onSentRequest,
    response,
    setResponse,
    prompt,
    setPrompt,
    openNewChat,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
