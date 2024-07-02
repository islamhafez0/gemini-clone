import { ReactNode, createContext, useState } from "react";
import runChat from "../config/gemini";
import { ContextTypes, InitialContextChatState } from "../interface";

export const AppContext = createContext<ContextTypes | undefined>(undefined);

type ProviderChildren = {
  children: ReactNode;
};
const INITIAL_STATE: InitialContextChatState = {
  showResults: false,
  loading: false,
  error: "",
  response: "",
  prompt: "",
};
export const AppProvider = ({ children }: ProviderChildren) => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const [chatState, setChatState] = useState(INITIAL_STATE);

  const onSentRequest = async () => {
    try {
      setChatState((prev) => ({
        ...prev,
        loading: true,
        showResults: true,
        prompt: input,
      }));
      const res = await runChat(input);
      setChatState((prev) => ({
        ...prev,
        response: res,
      }));
    } catch (error) {
      setChatState((prev) => ({
        ...prev,
        error: "Something went wrong please try again.",
      }));
      console.log(error);
    } finally {
      setChatState((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  const openNewChat = () => {
    setChatState(INITIAL_STATE);
    setToggleSidebar(false);
  };

  const contextValue = {
    toggleSidebar,
    setToggleSidebar,
    input,
    setInput,
    ...chatState,
    onSentRequest,
    openNewChat,
    setChatState,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
