import { SetStateAction } from "react";

export const createAvatar = (
  displayName: string,
  setPopup?: React.Dispatch<SetStateAction<boolean>>
) => {
  const firstLetter = displayName?.slice(0, 1);
  let avatarClassname = "avatar ";
  if (/[AEIOU]/.test(firstLetter)) {
    avatarClassname += "vowel-avatar";
  } else if (/[0-9]/.test(firstLetter)) {
    avatarClassname += "number-avatar";
  } else {
    avatarClassname += "constant-avatar";
  }
  return (
    <button
      onClick={setPopup ? () => setPopup((prev) => !prev) : undefined}
      className={avatarClassname}
    >
      {firstLetter?.toUpperCase()}
    </button>
  );
};
