import React, { SetStateAction } from "react";

export const handleSpeechSynthesis = (text: string): void => {
  let uternace = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(uternace);
};

export const copyToClipboard = (
  text: string,
  setIsCopied: React.Dispatch<SetStateAction<boolean>>
) => {
  if (!navigator.clipboard) {
    throw Error("Clipboard not supported!");
  }
  navigator.clipboard.writeText(text);
  try {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  } catch (error) {
    console.error("Failed to copy text to clipboard:", error);
  }
};
