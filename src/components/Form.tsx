import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { useAppContext } from "../hooks/useAppContext";

const Form = () => {
  const [initialHeight, setInitialHeight] = useState<number | null>(null);
  const { input, setInput, onSentRequest, setResponse } = useAppContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || input.trim() === "") {
      return;
    }
    setResponse("");
    onSentRequest();
    setInput("");
    if (textareaRef.current && initialHeight !== null) {
      textareaRef.current.style.height = `${initialHeight}px`;
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
    }
  };

  const handleTextareaFocus = () => {
    if (textareaRef.current && initialHeight === null) {
      setInitialHeight(textareaRef.current.scrollHeight);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="input">
          <textarea
            ref={textareaRef}
            placeholder="Enter a prompt here"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleTextareaFocus}
            rows={1}
            style={{
              overflowY:
                textareaRef.current &&
                textareaRef.current.scrollHeight >
                  textareaRef.current.clientHeight
                  ? "auto"
                  : "hidden",
            }}
          />
          <div className="input-icons">
            <button
              type="submit"
              className={`${!input.trim() ? "i-disabled" : ""} `}
              disabled={!input.trim()}
            >
              <LuSendHorizonal />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
