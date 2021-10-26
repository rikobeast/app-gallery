import React, { useState, useRef } from "react";
import "../styles/Dashboard.css";
import { supabase } from "../supabase";
import { useAuth } from "../auth/AuthProvider";
import Button from "./Button";

function DashboardSettings() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const usernameRef = useRef();
  const fnameRef = useRef();
  const lnameRef = useRef();
  const websiteRef = useRef();
  const { user } = useAuth();

  async function updateProfile() {
    const username = usernameRef.current.value;
    const fname = fnameRef.current.value;
    const lname = lnameRef.current.value;
    const website = websiteRef.current.value;

    setError("");
    setSuccess("");
    const { error } = await supabase.from("profiles").upsert({
      id: user?.id,
      username: username,
      first_name: fname,
      last_name: lname,
      website: website,
    });

    if (error) {
      setSuccess("");
      setError(error.message);
    } else {
      setError("");
      setSuccess("Changes saved successfully.");
      usernameRef.current.value = "";
      fnameRef.current.value = "";
      lnameRef.current.value = "";
      websiteRef.current.value = "";
    }
  }

  return (
    <div className="dashboard-content">
      <div className="notification-handling">
        <div className={success ? "success" : null}>{success}</div>
        <div className={error ? "error" : null}>{error}</div>
      </div>
      <div className="container">
        <div className="header">
          <label>General</label>
        </div>
        <div className="sub-header">
          <div className="sub-header-content">
            <label>Username</label>
            <input type="text" id="username" ref={usernameRef}></input>
          </div>
          <div className="sub-header-content">
            <label>First name</label>
            <input type="text" id="fname" ref={fnameRef}></input>
          </div>
          <div className="sub-header-content">
            <label>Last name</label>
            <input type="text" id="lname" ref={lnameRef}></input>
          </div>
          <div className="sub-header-content">
            <label>Website</label>
            <input type="text" id="website" ref={websiteRef}></input>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="header">
          <label>Security</label>
        </div>
        <div className="sub-header">
          <div className="sub-header-content">
            <label>Password</label>
            <input type="password" id="password"></input>
          </div>
          <div className="sub-header-content">
            <label>Confirm new password</label>
            <input type="password" id="c-password"></input>
          </div>
        </div>
      </div>
      <div className="button-container">
        <Button onClick={updateProfile} id="save-btn" value="Save" />
      </div>
    </div>
  );
}

export default DashboardSettings;
