import { useEffect, useState } from "react";
type UseTypingEffectReturn = [string, boolean];
export const useTypingEffect = (
  text: string,
  speed: number
): UseTypingEffectReturn => {
  const [displayedText, setDisplayedText] = useState("");
  const [isFinishedTyping, setIsFinishedTyping] = useState(false);
  useEffect(() => {
    let intervalId: any;
    setIsFinishedTyping(false);
    let index = 0;
    let displayedResponse = "";

    intervalId = setInterval(() => {
      displayedResponse += text[index];
      setDisplayedText(displayedResponse);
      index++;

      if (index >= text.length) {
        clearInterval(intervalId);
        setIsFinishedTyping(true);
      }
    }, speed);
    return () => {
      clearInterval(intervalId);
    };
  }, [text, speed]);
  return [displayedText, isFinishedTyping];
};
