import React from "react";
import "./Footer.css";
import logo from "../../assets/evangadiLogo.png";
import { facebook } from "react-icons-kit/feather/facebook";
import { instagram } from "react-icons-kit/feather/instagram";
import { youtube } from "react-icons-kit/feather/youtube";
import Icon from "react-icons-kit";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-wrapper d-md-flex justify-content-around">
      <div className="logo-icon-wrapper">
        <div className="logo">
          <Link to="https://www.evangadi.com/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="icons">
          <Link to="https://www.facebook.com/evangaditech/">
            <Icon icon={facebook} size={24} />
          </Link>
          <Link to="https://www.instagram.com/evangaditech/">
            <Icon icon={instagram} size={24} />
          </Link>
          <Link to="https://www.youtube.com/@EvangadiTech">
            <Icon icon={youtube} size={24} />
          </Link>
        </div>
      </div>
      <div className="row">
        <h3 className="title">Useful Link</h3>
        <div className="useful-link">
          <Link to="https://www.evangadi.com/">How it works</Link>
          <Link to="https://www.evangadi.com/legal/terms/">Terms of Service</Link>
          <Link to="https://www.evangadi.com/legal/privacy/">Privacy policy</Link>
        </div>
      </div>
      <div className="row">
        <div className="contact-info">
          <h3 className="title">Contact Info</h3>
          <p>Evangadi Networks</p>
          <p>support@evangadi.com</p>
          <p>+1-202-386-2702</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
