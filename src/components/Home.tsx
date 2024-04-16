import { useAppContext } from "../hooks/useAppContext";
import Form from "./Form";
import AiResponse from "./AiResponse";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTypingEffect } from "../hooks/useTypingEffect";

const Home = () => {
  const { showResults } = useAppContext();
  const { user } = useAuthContext();
  const displayedText = useTypingEffect(user?.displayName!, 100);
  return (
    <>
      <div className="home">
        {!showResults ? (
          <>
            <div className="welcome">
              <h1>
                Hello, {displayedText || "Loading..."}. <br />
                <p>How can I help you today?</p>
              </h1>
            </div>
          </>
        ) : (
          <AiResponse />
        )}
        <Form />
      </div>
    </>
  );
};

export default Home;
