import React, { useState, createRef, useEffect } from "react";
import Button from "../components/Button";
import "../styles/Auth.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import FormInput from "./FormInput";

function AuthRegister() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordState, setPasswordState] = useState("");
  const emailRef = createRef();
  const passwordRef = createRef();
  const confirmPasswordRef = createRef();
  const history = useHistory();
  const { signUp } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmedPassword = confirmPasswordRef.current.value;

    if (password !== confirmedPassword) {
      return setError("Passwords do not match.");
    }
    if (passwordState.length < 8) {
      return setError("Password must be at least 8 characters long.");
    }

    setLoading(true);
    setError("");

    const { error } = await signUp({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
    } else {
      history.push("/app-gallery");
    }
    setLoading(false);
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 id="heading">Create an account</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="error">{error}</div>
          <FormInput
            type="email"
            className="email"
            placeholder="Email"
            ref={emailRef}
            required
          ></FormInput>
          <FormInput
            type="password"
            className="password"
            placeholder="Password"
            ref={passwordRef}
            required
          ></FormInput>
          <FormInput
            type="password"
            className="password"
            placeholder="Confirm password"
            ref={confirmPasswordRef}
            required
          ></FormInput>
          <Button
            id="auth-button"
            disabled={loading}
            type="submit"
            value={loading ? <span>Loading...</span> : <span>Sign in</span>}
          />
          <Link to="/login" id="reg-redirect">
            Already have an account? Log in.
          </Link>
        </form>
      </div>
    </div>
  );
}

export default AuthRegister;
