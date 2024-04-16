import { TUserCreateAccountInputs } from "./interface";

export const createAccountInputs: TUserCreateAccountInputs[] = [
  {
    type: "text",
    name: "displayName",
    id: "username",
    label: "Username",
  },
  {
    type: "email",
    name: "email",
    id: "userEmail",
    label: "Email",
  },
  {
    type: "password",
    name: "password",
    id: "userPassword",
    label: "Password",
  },
];
export const signinInputs: TUserCreateAccountInputs[] = [
  {
    type: "email",
    name: "email",
    id: "userEmail",
    label: "Email",
  },
  {
    type: "password",
    name: "password",
    id: "userPassword",
    label: "Password",
  },
];
