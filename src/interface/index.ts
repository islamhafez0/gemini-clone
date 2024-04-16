import { FirebaseApp } from "firebase/app";
import { User } from "firebase/auth";
import { SetStateAction } from "react";

export type ContextTypes = {
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<SetStateAction<boolean>>;
  input: string;
  setInput: React.Dispatch<SetStateAction<string>>;
  showResults: boolean;
  setShowResults: React.Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  error: string;
  onSentRequest: () => void;
  response: string;
  setResponse: React.Dispatch<SetStateAction<string>>;
  prompt: string;
  setPrompt: React.Dispatch<SetStateAction<string>>;
  openNewChat: () => void;
};

export type FirebaseContextProps = {
  app: FirebaseApp;
};

export type AuthContextProps = {
  signup: ({
    displayName,
    email,
    password,
  }: {
    displayName: string;
    email: string;
    password: string;
  }) => Promise<boolean>;
  signin: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<boolean>;
  signUserOut: () => Promise<boolean>;
  firebaseLoading: boolean;
  firebaseError: string;
  user: User | null;
  isAuth: boolean;
  signupWithGoogle: () => Promise<boolean>;
};

export type TUserCreateAccountData = {
  displayName: string;
  email: string;
  password: string;
};

export type TUserSigninData = {
  email: string;
  password: string;
};

export type TUserCreateAccountInputs = {
  type: string;
  name: string;
  id: string;
  label: string;
};
