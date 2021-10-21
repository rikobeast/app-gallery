import React, { useState, useEffect } from "react";
import Button from "./Button";
import { useHistory } from "react-router";
import { useAuth } from "../auth/AuthProvider";
import "../styles/HomePage.css";
import bgImage from "../images/bgImage.jpg";
import { BsArrowRight } from "react-icons/bs";

function HomePage() {
  const history = useHistory();
  const { user } = useAuth();
  const [isLogged, setIsLogged] = useState(false);

  async function handleClick() {
    history.push("/register");
  }

  useEffect(() => {
    user ? setIsLogged(true) : setIsLogged(false);
  }, [user]);

  return (
    <div className="content">
      <div className="welcome-message-m">
        <h1>Game Gallery</h1>
        <span>
          If you are a game-dev enthusiast, this is the place for you to promote
          your games!
        </span>
      </div>
      <div className="wrapper">
        <div className="content-container">
          <div className="welcome-message">
            <h1>Game Gallery</h1>
            <span>
              If you are a game-dev enthusiast, this is the place for you to
              promote your games!
            </span>
          </div>
          <div className="top-highlight"></div>
          <div className="bottom-highlight"></div>
        </div>
      </div>
      <div className="image-wrapper">
        <img src={bgImage} alt="" />
        {!isLogged ? (
          <Button
            onClick={handleClick}
            id="sign-up"
            value="Sign up"
            icon={<BsArrowRight size="20" />}
          />
        ) : null}
      </div>
    </div>
  );
}

export default HomePage;
