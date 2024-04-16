import { MdVolumeUp } from "react-icons/md";
import { copyToClipboard, handleSpeechSynthesis } from "../utils";
import { FaRegClipboard } from "react-icons/fa";
import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";

const ResponseIcons = ({
  response,
  loading,
}: {
  response: string;
  loading: boolean;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className="response-icons">
      <button
        className={`${loading && "loading"}`}
        disabled={!response || loading}
        onClick={() => handleSpeechSynthesis(response)}
      >
        <MdVolumeUp />
      </button>
      {isCopied ? (
        <button>
          <IoMdCheckmark />
        </button>
      ) : (
        <button
          className={`${loading && "loading"}`}
          disabled={!response || loading}
          onClick={() => copyToClipboard(response, setIsCopied)}
        >
          <FaRegClipboard />
        </button>
      )}
    </div>
  );
};

export default ResponseIcons;
