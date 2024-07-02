import { createAvatar } from "../helpers";
import { containsArabicCharacters } from "../utils";

const UserPrompt = ({
  prompt,
  displayName,
}: {
  prompt: string;
  displayName: string;
}) => {
  const isContainsArabic = containsArabicCharacters(prompt);
  return (
    <div className={`user-prompt ${isContainsArabic ? "rtl" : ""}`}>
      <div>{createAvatar(displayName)}</div>
      <h4>{prompt}</h4>
    </div>
  );
};

export default UserPrompt;
