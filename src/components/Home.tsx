import { useAppContext } from "../hooks/useAppContext";
import ChatResults from "./ChatResults";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTypingEffect } from "../hooks/useTypingEffect";
import FlashingCursor from "./FlashingCursor";

const Home = () => {
  const { showResults } = useAppContext();
  const { user } = useAuthContext();
  const displayName = user?.displayName || "";
  const [displayedText, isFinishedTyping] = useTypingEffect(
    displayName || "Loading...",
    100
  );
  return (
    <div className="home">
      {!showResults ? (
        <>
          <div className="welcome">
            <h1>
              Hello, {displayedText}
              {!isFinishedTyping && (
                <FlashingCursor height="30px" width="4px" />
              )}
              . <br />
              <p>How can I help you today?</p>
            </h1>
          </div>
        </>
      ) : (
        <ChatResults />
      )}
    </div>
  );
};

export default Home;
