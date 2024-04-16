import { BiImageAdd } from "react-icons/bi";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { useAppContext } from "../hooks/useAppContext";
import { ChangeEvent, FormEvent } from "react";
import { LuSendHorizonal } from "react-icons/lu";

const Form = () => {
  const { input, setInput, onSentRequest, setResponse } = useAppContext();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
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
  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="input">
          <input
            type="text"
            placeholder="Enter a prompt here"
            value={input}
            onChange={handleChange}
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
