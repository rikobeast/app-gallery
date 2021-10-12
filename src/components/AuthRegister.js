import React, { useRef, useState } from "react";
import "../styles/Auth.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

function AuthRegister() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
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
          <input
            type="email"
            className="email"
            placeholder="Email"
            ref={emailRef}
            required
          ></input>
          <input
            type="password"
            className="password"
            placeholder="Password"
            ref={passwordRef}
            required
          ></input>
          <input
            type="password"
            className="password-confirm"
            placeholder="Confirm password"
            ref={confirmPasswordRef}
            required
          ></input>
          <button id="auth-button" disabled={loading} type="submit">
            {loading ? <span>Loading...</span> : <span>Sign in</span>}
          </button>
          <Link to="/login" id="reg-redirect">
            Already have an account? Log in.
          </Link>
        </form>
      </div>
    </div>
  );
}

export default AuthRegister;
