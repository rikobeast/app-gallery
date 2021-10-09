import React from "react";
import "../styles/home-page.css";

function HomePage() {
  return (
    <div className="content">
      <div className="page-header">
        <h2 className="welcome-msg">
          Welcome to <span id="app-name">App Gallery!</span>
        </h2>
        <span className="description">
          If you are a game-dev enthusiast, this is the place for you to promote
          your games!
        </span>
      </div>
    </div>
  );
}

export default HomePage;
