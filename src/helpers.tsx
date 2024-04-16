export const createAvatar = (displayName: string) => {
  const firstLetter = displayName?.slice(0, 1);
  let avatarClassname = "avatar ";
  if (/[AEIOU]/.test(firstLetter)) {
    avatarClassname += "vowel-avatar";
  } else if (/[0-9]/.test(firstLetter)) {
    avatarClassname += "number-avatar";
  } else {
    avatarClassname += "constant-avatar";
  }
  return <span className={avatarClassname}>{firstLetter}</span>;
};
