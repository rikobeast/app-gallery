import React from "react";
import "../styles/dashboard.css";
import DashboardSettings from "./DashboardSettings";

function Dashboard() {
  return (
    <div className="account-page">
      <div className="profile-container">
        <div className="avatar-container">
          <div className="avatar"></div>
        </div>
        <div className="user-info">
          <div className="names">
            <p>Test Test</p>
          </div>
        </div>
      </div>
      <DashboardSettings />
    </div>
  );
}

export default Dashboard;
