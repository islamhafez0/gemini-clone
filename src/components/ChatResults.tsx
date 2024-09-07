import { useAppContext } from "../hooks/useAppContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTypingEffect } from "../hooks/useTypingEffect";
import UserPrompt from "./UserPrompt";
import AiResponse from "./AiResponse";
import { useEffect, useRef } from "react";

const ChatResults = () => {
  const { prompt, response, loading, error } = useAppContext();
  const { user } = useAuthContext();
  const [displayedText] = useTypingEffect(response, 15);
  const typingEffectFinished =
    displayedText.length === response.length && !loading;
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
      });
    }
  }, [displayedText]);
  return (
    <div className="chat-results" ref={chatContainerRef}>
      <UserPrompt displayName={user?.displayName!} prompt={prompt} />
      <AiResponse
        error={error}
        loading={loading}
        displayedText={displayedText}
        response={response}
        typingEffectFinished={typingEffectFinished}
      />
    </div>
  );
};

export default ChatResults;
