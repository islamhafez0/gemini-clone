import { useAppContext } from "../hooks/useAppContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTypingEffect } from "../hooks/useTypingEffect";
import UserPrompt from "./UserPrompt";
import AiResponse from "./AiResponse";

const ChatResults = () => {
  const { prompt, response, loading, error } = useAppContext();
  const { user } = useAuthContext();
  const [displayedText] = useTypingEffect(response, 5);
  const typingEffectFinished =
    displayedText.length === response.length && !loading;
  return (
    <div className="chat-results">
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
