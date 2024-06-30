import { ChangeEvent, FormEvent, KeyboardEvent, useRef } from "react";
import { BiImageAdd } from "react-icons/bi";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { LuSendHorizonal } from "react-icons/lu";
import { useAppContext } from "../hooks/useAppContext";

const Form = () => {
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
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
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
            rows={1}
          />
          <div className="input-icons">
            <button>
              <BiImageAdd />
            </button>
            <button>
              <MdOutlineKeyboardVoice />
            </button>
            <button type="submit">
              <LuSendHorizonal />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
