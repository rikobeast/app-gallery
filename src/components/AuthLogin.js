import React, { useState, createRef } from "react";
import "../styles/Auth.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import Button from "../styled_components/Button";
import InputField from "./InputField";

function AuthLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = createRef();
  const passwordRef = createRef();
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
      history.push("/");
    }

    setLoading(false);
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div id="heading">Log in</div>
        <div className={error ? "error" : null}>{error}</div>
        <form className="login-form" onSubmit={handleSubmit}>
          <InputField
            className="email"
            type="email"
            placeholder="Email"
            ref={emailRef}
          />
          <InputField
            className="password"
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
          <Button disabled={loading} type="submit">
            {loading ? <span>Loading...</span> : <span>Log in</span>}
          </Button>
          <Link to="/register" id="reg-redirect">
            Don't have an account? Register here.
          </Link>
        </form>
      </div>
    </div>
  );
}

export default AuthLogin;
