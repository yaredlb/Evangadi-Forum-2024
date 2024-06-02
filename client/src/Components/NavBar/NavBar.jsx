import React from "react";
import "./NavBar.css";
import evangadiLogo from "../../assets/evangadi-logo-black.png";

const NavBar = () => {
  return (
    <>
      <div className="nav">
        <div className="nav-left">
          <a href="/">
            <img src={evangadiLogo} alt="logo" />
          </a>
        </div>
        <div className="nav-right">
          <ul>
            <li className="nav-right-item"><a href="/">Home</a></li>
            <li className="nav-right-item"><a href="#">How it Works</a></li>
            <li className="nav-right-logout"><a href="#">Logout</a></li>
          </ul>
        </div>
      </div>
      <hr />
    </>
  );
};

export default NavBar;
