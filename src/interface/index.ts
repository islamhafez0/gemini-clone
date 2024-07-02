import { FirebaseApp } from "firebase/app";
import { User } from "firebase/auth";
import React, { SetStateAction } from "react";

export type InitialContextChatState = {
  loading: boolean;
  error: string;
  prompt: string;
  showResults: boolean;
  response: string;
}

export type ContextTypes = {
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<SetStateAction<boolean>>;
  input: string;
  setInput: React.Dispatch<SetStateAction<string>>;
  showResults: boolean;
  loading: boolean;
  error: string;
  response: string;
  prompt: string;
  setChatState: React.Dispatch<SetStateAction<InitialContextChatState>>
  onSentRequest: () => void;
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
  gettingCurrentUser: boolean;
  loadingProviderRegistration: boolean;
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
