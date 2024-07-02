import { copyToClipboard, removeMarkdownSyntax } from "../utils";
import { FaRegClipboard } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";

const ResponseIcons = ({
  response,
  loading,
}: {
  response: string;
  loading: boolean;
}) => {
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const [isCopied, setIsCopied] = useState(false);
  const [isSpeaking, setIsPeaking] = useState(false);
  const formattedText = removeMarkdownSyntax(response);

  const startSpeech = () => {
    const utternace = new SpeechSynthesisUtterance(formattedText);
    speechSynthesis.speak(utternace);
    setIsPeaking(true);
    utternace.onend = function () {
      setIsPeaking(false);
    };
  };

  const stopSpeech = () => {
    speechSynthesis.cancel();
    setIsPeaking(false);
  };

  return (
    <div className="response-icons">
      {isSpeaking ? (
        <button onClick={stopSpeech}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="icon-md-heavy"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12m7.5-3.5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      ) : (
        <button
          className={`${loading && "loading"}`}
          disabled={!response || loading}
          onClick={startSpeech}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            fill="none"
            viewBox="0 0 24 24"
            className="icon-md-heavy"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M11 4.91a.5.5 0 0 0-.838-.369L6.676 7.737A1 1 0 0 1 6 8H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2a1 1 0 0 1 .676.263l3.486 3.196A.5.5 0 0 0 11 19.09zM8.81 3.067C10.415 1.597 13 2.735 13 4.91v14.18c0 2.175-2.586 3.313-4.19 1.843L5.612 18H4a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h1.611zm11.507 3.29a1 1 0 0 1 1.355.401A10.96 10.96 0 0 1 23 12c0 1.85-.458 3.597-1.268 5.13a1 1 0 1 1-1.768-.934A8.96 8.96 0 0 0 21 12a8.96 8.96 0 0 0-1.085-4.287 1 1 0 0 1 .402-1.356M15.799 7.9a1 1 0 0 1 1.4.2 6.48 6.48 0 0 1 1.3 3.9c0 1.313-.39 2.537-1.06 3.56a1 1 0 0 1-1.673-1.096A4.47 4.47 0 0 0 16.5 12a4.47 4.47 0 0 0-.9-2.7 1 1 0 0 1 .2-1.4"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      )}

      {isCopied ? (
        <button>
          <IoMdCheckmark />
        </button>
      ) : (
        <button
          className={`${loading && "loading"}`}
          disabled={!response || loading}
          onClick={() => copyToClipboard(formattedText, setIsCopied)}
        >
          <FaRegClipboard />
        </button>
      )}
    </div>
  );
};

export default ResponseIcons;
