import React, { useState, useEffect } from "react";
import { Switch, Link, useHistory } from "react-router-dom";
import "../styles/navbar.css";
import { useAuth } from "../auth/AuthProvider";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

function NavBar() {
  const { user, signOut } = useAuth();
  const [isLogged, setIsLogged] = useState(false);
  const [click, setClick] = useState(true);
  const history = useHistory();

  let iconStyles = {
    color: "white",
    width: "40",
    height: "40",
  };

  async function handleLogout() {
    await signOut();
    history.push("/login");
  }

  async function handleClick() {
    setClick(!click);
  }
  async function closeMobileMenu() {
    setClick(true);
  }

  useEffect(() => {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [user]);

  return (
    <Switch>
      <div className="navigation">
        <div className="logo">
          <Link id="logo" to="/app-gallery">
            Logo
          </Link>
        </div>
        <div className="web-nav">
          {isLogged ? (
            <div className="nav-links">
              <Link id="option" to="/games">
                Games
              </Link>
              <Link id="option" to="/discussions">
                Discussions
              </Link>
              <Link id="option" to="/upload">
                Upload
              </Link>
              <Link id="option" to="/dashboard">
                Account
              </Link>
            </div>
          ) : (
            <div className="nav-links">
              <Link id="option" to="/games">
                Games
              </Link>
              <Link id="option" to="/discussions">
                Discussions
              </Link>
              <Link id="option" to="/register">
                Sign up
              </Link>
            </div>
          )}
        </div>
        {isLogged ? (
          <div className="btn-container">
            <Link id="logout-btn" to="/login" onClick={handleLogout}>
              Log out
            </Link>
          </div>
        ) : (
          <div className="btn-container">
            <Link id="login-btn" to="/login">
              Log in
            </Link>
          </div>
        )}
        <div className="mobile-nav">
          <div className="hamburger-menu" onClick={handleClick}>
            {click ? (
              <AiOutlineMenu style={iconStyles} />
            ) : (
              <AiOutlineClose style={iconStyles} />
            )}
          </div>
        </div>
        <div className={click ? "nav-menu" : "nav-menu active"}>
          {isLogged ? (
            <div className="menu">
              <Link onClick={closeMobileMenu} id="m-option" to="/games">
                Games
              </Link>
              <Link onClick={closeMobileMenu} id="m-option" to="/discussions">
                Discussions
              </Link>
              <Link onClick={closeMobileMenu} id="m-option" to="/upload">
                Upload
              </Link>
              <Link onClick={closeMobileMenu} id="m-option" to="/dashboard">
                Account
              </Link>
              <Link
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                id="logout-btn-m"
                to="/login"
              >
                Log out
              </Link>
            </div>
          ) : (
            <div className="menu">
              <Link onClick={closeMobileMenu} id="m-option" to="/games">
                Games
              </Link>
              <Link onClick={closeMobileMenu} id="m-option" to="/discussions">
                Discussions
              </Link>
              <Link onClick={closeMobileMenu} id="m-option" to="/register">
                Sign up
              </Link>
              <Link onClick={closeMobileMenu} id="login-btn-m" to="/login">
                Log in
              </Link>
            </div>
          )}
        </div>
      </div>
    </Switch>
  );
}
export default NavBar;
