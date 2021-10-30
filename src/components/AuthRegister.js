import React, { useState, useRef } from "react";
import Button from "../components/Button";
import "../styles/Auth.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import InputField from "./InputField";
import { IoIosClose } from "react-icons/io";
import { IoIosCheckmark } from "react-icons/io";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

function AuthRegister() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState();
  const [validation, setValidations] = useState([]);
  const [emailState, setEmailState] = useState();
  const [showPassword, setShowPassword] = useState();
  const [showConfirmedPassword, setShowConfirmedPassword] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const history = useHistory();
  const { signUp } = useAuth();

  let passwordStrength = 0;
  let validations = [];

  function showPasswordToUser() {
    setShowPassword(!showPassword);
  }
  function showConfirmedPasswordToUser() {
    setShowConfirmedPassword(!showConfirmedPassword);
  }
  function checkIfPasswordsMatch() {
    const password = passwordRef.current.value;
    const confirmedPassword = confirmPasswordRef.current.value;
    if (password !== confirmedPassword) {
      return false;
    }
    return true;
  }

  function validateEmail() {
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    setError("");
    setEmailState(emailRef.current.value);
    if (regex.test(emailState) === false) {
      return false;
    }
    return true;
  }

  async function validatePassword() {
    const password = passwordRef.current.value;

    validations = [
      password.length >= 8,
      password.search(/[A-Z]/) > -1,
      password.search(/[0-9]/) > -1,
      password.search(/[!%$&+,:;=?@#]/) > -1,
    ];
    passwordStrength = validations.reduce(
      (accumulatedValue, currentValue) => accumulatedValue + currentValue
    );
    setStrength(passwordStrength);
    setValidations(validations);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setLoading(true);
    setError("");
    validateEmail();

    if (!checkIfPasswordsMatch()) {
      setLoading(false);
      return setError("Passwords do not match.");
    }
    if (!validateEmail()) {
      setLoading(false);
      return setError("Invalid email.");
    }

    if (strength < 4) {
      setError("Password does not meet the requirements.");
    } else {
      const { data } = await signUp({
        email: email,
        password: password,
      });
      history.push("/");
    }
    setLoading(false);
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div id="heading">Create an account</div>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="error">{error}</div>
          <InputField
            type="email"
            className="email"
            placeholder="Email"
            ref={emailRef}
            required
          />
          <InputField
            type={showPassword ? "text" : "password"}
            className="password"
            placeholder="Password"
            ref={passwordRef}
            onChange={validatePassword}
            icon={
              showPassword ? (
                <BiHide color="008eda" onClick={showPasswordToUser} />
              ) : (
                <BiShow color="008eda" onClick={showPasswordToUser} />
              )
            }
            required
          />
          <InputField
            type={showConfirmedPassword ? "text" : "password"}
            className="password"
            placeholder="Confirm password"
            ref={confirmPasswordRef}
            icon={
              showConfirmedPassword ? (
                <BiHide color="008eda" onClick={showConfirmedPasswordToUser} />
              ) : (
                <BiShow color="008eda" onClick={showConfirmedPasswordToUser} />
              )
            }
            required
          />
          <div className="validations">
            <div>
              {validation[0] ? (
                <IoIosCheckmark size="20" color="green" />
              ) : (
                <IoIosClose size="20" color="red" />
              )}
              <span>Password must be at least 8 characters.</span>
            </div>
            <div>
              {validation[1] ? (
                <IoIosCheckmark size="20" color="green" />
              ) : (
                <IoIosClose size="20" color="red" />
              )}
              <span>Password must have at least one uppercase letter.</span>
            </div>
            <div>
              {validation[2] ? (
                <IoIosCheckmark size="20" color="green" />
              ) : (
                <IoIosClose size="20" color="red" />
              )}
              <span>Password must have at least one number.</span>
            </div>
            <div>
              {validation[3] ? (
                <IoIosCheckmark size="20" color="green" />
              ) : (
                <IoIosClose size="20" color="red" />
              )}
              <span>Password must have at least one special character.</span>
            </div>
          </div>

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
