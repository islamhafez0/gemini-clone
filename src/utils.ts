import React, { SetStateAction } from "react";


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

export const removeMarkdownSyntax = (markdownText: string) => {
  return markdownText
    .replace(/\*\*/g, '') 
    .replace(/\*/g, '') 
    .replace(/#/g, '') 
    .replace(/-/g, '') 
    .replace(/`/g, '') 
    .replace(/\[.*?\]\(.*?\)/g, (match) => match.replace(/\[|\]|\(.*?\)/g, ''))
    .replace(/!\[.*?\]\(.*?\)/g, (match) => match.replace(/!\[|\]|\(.*?\)/g, ''))
    .replace(/\r?\n|\r/g, '\n') 
    .trim(); 
};

export const containsArabicCharacters = (text: string) => {
  const arabicCharacters = /[ابتثجحخدذرزسشصضطظعغفقكلمنهويءآٱأإةؤئى؟٠١٢٣٤٥٦٧٨٩٬٫]/;
  return arabicCharacters.test(text)
}