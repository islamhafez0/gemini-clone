import React, { ChangeEvent, FormEvent, useState } from "react";
import { signinInputs } from "../constansts";
import { TUserCreateAccountData, TUserSigninData } from "../interface";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
const Login = () => {
  const { firebaseError, firebaseLoading, signin, gettingCurrentUser } =
    useAuthContext();
  const [userData, setUserData] = useState<TUserSigninData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { isAuth } = useAuthContext();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const name = target.name as keyof TUserCreateAccountData;
    setUserData((prev) => ({
      ...prev,
      [name]: target.value,
    }));
  };
  const handleSigninSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allValsFilled = Object.values(userData).every(
      (value) => typeof value === "string" && value.trim() !== ""
    );
    if (!allValsFilled) {
      return;
    }
    const signedin = await signin(userData);
    if (signedin) {
      navigate("/");
      setUserData({
        email: "",
        password: "",
      });
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
      {isAuth ? <Navigate to="/" /> : <Navigate to="/login" />}
      <form onSubmit={handleSigninSubmit} className="login">
        <h2>Signin</h2>
        {firebaseError && <p className="error">{firebaseError}</p>}
        {signinInputs.map((input) => (
          <React.Fragment key={input.id}>
            <label htmlFor={input.id}>{input.label}</label>
            <input
              onChange={handleChange}
              value={userData[input.name as keyof TUserSigninData] as string}
              type={input.type}
              name={input.name}
              id={input.id}
            />
          </React.Fragment>
        ))}
        <button type="submit">
          {firebaseLoading ? <span className="spinner"></span> : "Submit"}
        </button>
        <div>
          <Link to="/create-account">Don't have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
