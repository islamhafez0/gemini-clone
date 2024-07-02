import { containsArabicCharacters } from "../utils";
import Loader from "./Loader";
import MarkdownWithSyntaxHighlighter from "./MarkdownWithSyntaxHighlighter";
import ResponseIcons from "./ResponseIcons";

const AiResponse = ({
  error,
  loading,
  displayedText,
  typingEffectFinished,
  response,
}: {
  error: string;
  loading: boolean;
  displayedText: string;
  typingEffectFinished: boolean;
  response: string;
}) => {
  const isContainsArabic = containsArabicCharacters(response);
  return (
    <>
      <div className={`ai-response ${isContainsArabic ? "rtl" : ""}`}>
        <img src="/assets/gemini_icon.png" alt="gemini" />
        {error && <p>{error}</p>}
        {loading ? (
          <Loader />
        ) : (
          <>
            <MarkdownWithSyntaxHighlighter content={displayedText} />
          </>
        )}
      </div>
      {typingEffectFinished && (
        <ResponseIcons response={response} loading={loading} />
      )}
    </>
  );
};

export default AiResponse;
