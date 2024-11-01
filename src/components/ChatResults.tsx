import { useAppContext } from "../hooks/useAppContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTypingEffect } from "../hooks/useTypingEffect";
import UserPrompt from "./UserPrompt";
import AiResponse from "./AiResponse";
import { useEffect, useRef, useState } from "react";

const ChatResults = () => {
  const { prompt, response, loading, error } = useAppContext();
  const { user } = useAuthContext();
  const [displayedText] = useTypingEffect(response, 20);
  const [autoscroll, setAutoscroll] = useState(true);
  const typingEffectFinished =
    displayedText.length === response.length && !loading;
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const container = chatContainerRef.current;
    const isAtBottom =
      container.scrollHeight - container.scrollTop === container.clientHeight;
    setAutoscroll(isAtBottom);
  };

  useEffect(() => {
    if (autoscroll && chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
      });
    }
  }, [displayedText, autoscroll]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

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
