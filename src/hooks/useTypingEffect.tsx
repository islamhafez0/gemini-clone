import { useEffect, useState } from "react";

export const useTypingEffect = (text: string, delay: number) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const updateText = () => {
      if (currentIndex === text.length) {
        clearInterval(interval);
      } else {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }
    };

    const animationFrame = requestAnimationFrame(() => {
      interval = setInterval(updateText, delay);
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      clearInterval(interval);
    };
  }, [currentIndex]);

  useEffect(() => {
    setCurrentIndex(0);
    setDisplayedText("");
  }, [text]);

  return displayedText;
};
