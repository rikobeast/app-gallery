import React, { useState, useRef } from "react";
import "../styles/Auth.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

function AuthLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setLoading(true);
    setError("");

    const { error } = await signIn({ email, password });
    if (error) {
      setError(error.message);
    } else {
      history.push("/app-gallery");
    }

    setLoading(false);
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 id="heading">Log in</h2>
        <div className={error ? "error" : null}>{error}</div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="username"
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
          <button id="auth-button" disabled={loading} type="submit">
            {loading ? <span>Loading...</span> : <span>Log in</span>}
          </button>
          <Link to="/register" id="reg-redirect">
            Don't have an account? Register here.
          </Link>
        </form>
      </div>
    </div>
  );
}

export default AuthLogin;
