import { useAppContext } from "../hooks/useAppContext";
import Loader from "./Loader";
import { useTypingEffect } from "../hooks/useTypingEffect";
import ResponseIcons from "./ResponseIcons";
import { useAuthContext } from "../hooks/useAuthContext";
import { createAvatar } from "../helpers";
const AiResponse = () => {
  const { prompt, response, formattedResponse, loading, error } =
    useAppContext();
  const { user } = useAuthContext();
  const displayedText = formattedResponse
    ? useTypingEffect(formattedResponse, 5)
    : "";
  const typingEffectFinished =
    displayedText.length === formattedResponse.length && !loading;
  return (
    <div className="result">
      <div className="user-prompt">
        <div>{createAvatar(user?.displayName!)}</div>
        <h4>{prompt}</h4>
      </div>
      <>
        <div className="ai-response">
          <img src="/assets/gemini_icon.png" alt="gemini" />
          {error ? <p>{error}</p> : null}
          {loading ? (
            <Loader />
          ) : (
            <div
              className="displayed-text"
              dangerouslySetInnerHTML={{ __html: displayedText }}
            ></div>
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
