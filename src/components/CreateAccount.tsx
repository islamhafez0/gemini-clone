import React, { ChangeEvent, FormEvent, useState } from "react";
import { createAccountInputs } from "../constansts";
import { TUserCreateAccountData } from "../interface";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
const CreateAccount = () => {
  const {
    firebaseError,
    firebaseLoading,
    loadingProviderRegistration,
    gettingCurrentUser,
    signup,
    signupWithGoogle,
    isAuth,
  } = useAuthContext();
  const [userData, setUserData] = useState<TUserCreateAccountData>({
    displayName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const name = target.name as keyof TUserCreateAccountData;
    setUserData((prev) => ({
      ...prev,
      [name]: target.value,
    }));
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allValsfilled = Object.values(userData).every(
      (value) => typeof value === "string" && value.trim() !== ""
    );
    if (!allValsfilled) {
      return;
    }
    const signediup = await signup(userData);
    if (signediup) {
      navigate("/");
      setUserData({
        displayName: "",
        email: "",
        password: "",
      });
    }
  };

  const handleSignupWithProvider = async () => {
    try {
      await signupWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  if (gettingCurrentUser) {
    return (
      <div className="loader-wrapper">
        <span className="spinner wider"></span>
        Loading....
      </div>
    );
  }

  return (
    <div className="auth-form">
      {isAuth && <Navigate to="/" />}
      <form onSubmit={handleSignup} className="form-data">
        <h2>Create Account</h2>
        {firebaseError && <p className="error">{firebaseError}</p>}
        {createAccountInputs.map((input) => (
          <React.Fragment key={input.id}>
            <label htmlFor={input.id}>{input.label}</label>
            <input
              onChange={handleChange}
              value={
                userData[input.name as keyof TUserCreateAccountData] as string
              }
              type={input.type}
              name={input.name}
              id={input.id}
            />
          </React.Fragment>
        ))}
        <button type="submit" disabled={firebaseLoading}>
          {firebaseLoading ? <span className="spinner"></span> : "Submit"}
        </button>
        <button
          onClick={handleSignupWithProvider}
          className="provider"
          disabled={loadingProviderRegistration}
        >
          {loadingProviderRegistration ? (
            <span className="spinner wider"></span>
          ) : (
            <>
              <span>Signup With Google</span>
              <img src="/assets/google.png" alt="google" />
            </>
          )}
        </button>
        <Link to="/login">Already have an account?</Link>
      </form>
    </div>
  );
};

export default CreateAccount;
