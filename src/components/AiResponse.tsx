import { useAppContext } from "../hooks/useAppContext";
import Loader from "./Loader";
import { useTypingEffect } from "../hooks/useTypingEffect";
import ResponseIcons from "./ResponseIcons";
import { useAuthContext } from "../hooks/useAuthContext";
import { createAvatar } from "../helpers";
const AiResponse = () => {
  const { prompt, response, loading, error } = useAppContext();
  const { user } = useAuthContext();
  const displayedText = response ? useTypingEffect(response, 5) : "";
  const typingEffectFinished =
    displayedText.length === response.length && !loading;
  return (
    <div className="result">
      <div className="user-prompt">
        {createAvatar(user?.displayName!)}
        <h4>{prompt}</h4>
      </div>
      <>
        <div className="ai-response">
          <img src="/assets/gemini_icon.png" alt="gemini" />
          {error ? <p>{error}</p> : null}
          {loading ? (
            <Loader />
          ) : (
            <p dangerouslySetInnerHTML={{ __html: displayedText }}></p>
          )}
        </div>
        {typingEffectFinished && (
          <ResponseIcons response={response} loading={loading} />
        )}
      </>
    </div>
  );
};

export default AiResponse;
