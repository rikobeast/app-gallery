import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/Navbar.css";
import { useAuth } from "../auth/AuthProvider";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import navItems from "../navigation_items/navItem_data";
import Button from "./Button";
import Logo from "../images/GGA Logo.svg";

function NavBar() {
  const { user, signOut } = useAuth();
  const [isLogged, setIsLogged] = useState(false);
  const [clickedItemId, setClickedItemId] = useState();
  const [click, setClick] = useState(true);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const history = useHistory();

  //TODO <NavItem/> Component with isActive prop instead of mapping trough hardcoded object

  let iconStyles = {
    color: "white",
    width: "40",
    height: "40",
  };
  function toggleProfileDropdown() {
    setToggleDropdown(!toggleDropdown);
  }
  async function handleLogout() {
    await signOut();
    history.push("/login");
  }
  async function handleLogin() {
    history.push("/login");
  }

  async function handleClick() {
    setClick(!click);
  }
  async function closeMobileMenu() {
    setClick(true);
  }
  async function setNavItemActive(id) {
    setClickedItemId(id);
  }

  useEffect(() => {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [user, clickedItemId]);

  return (
    <div className="navigation">
      <div className="logo">
        <Link onClick={setNavItemActive} id="logo" to="/">
          <img src={Logo} alt="Back to homepage" />
        </Link>
      </div>
      {
        <div className="web-nav">
          <div className="nav-links">
            {navItems.map((item) => (
              <div key={item.id} className="nav-item">
                <Link
                  onClick={() => {
                    setNavItemActive(item.id);
                  }}
                  id={clickedItemId === item.id ? "option-active" : "option"}
                  to={`${item.url}`}
                >
                  {item.title}
                </Link>
                <div
                  className={clickedItemId === item.id ? "active" : null}
                ></div>
              </div>
            ))}
          </div>
        </div>
      }
      {isLogged ? (
        <div className="profile-dropdown">
          <div className="profile-image">
            <img src="" alt="" />
          </div>
          <div className="display-name">
            <p id="name">Zhivko Minchev</p>
          </div>
          <button className="dropdown-toggle" onClick={toggleProfileDropdown}>
            {toggleDropdown ? (
              <IoMdArrowDropup size="20" />
            ) : (
              <IoMdArrowDropdown size="20" />
            )}
          </button>
          {toggleDropdown ? (
            <div className="dropdown-display">
              <div id="dropdown-item">
                <Link onClick={toggleProfileDropdown} id="item" to="/dashboard">
                  Profile
                </Link>
              </div>
              <Button
                id="logout-btn"
                onClick={() => {
                  handleLogout();
                  toggleProfileDropdown();
                }}
                value="Log out"
              />
            </div>
          ) : null}
        </div>
      ) : (
        <div className="btn-container">
          <Button
            id="login-btn"
            onClick={() => {
              handleLogin();
              setNavItemActive();
            }}
            value="Log in"
          />
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
  );
}
export default NavBar;
