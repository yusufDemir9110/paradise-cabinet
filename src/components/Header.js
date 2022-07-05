import React from "react";
import logo from "../assets/logo.png";
import paradiseLogo from "../assets/paradiseLogo.png";
import styles from "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div>
      <header className="spaceBetween">
        <div className="headerLeft">
          <img src={logo} className="headerLogo" />
        </div>
        <div className="headerRight">
          <a href="tel:+15307333667">
            <FontAwesomeIcon className="faPhone" icon={faPhone} />
            <span>530 733 3667</span>
          </a>
        </div>
      </header>
      <nav className="spaceBetween">
        <div className="navLeft">
          <img src={paradiseLogo} className="navLogo" />
        </div>
        <div className="navRight">
          <ul>
            <li>
              <a href=""> ABOUT</a>
            </li>
            <li>
              <a href=""> CABINETS</a>
            </li>
            <li>
              <a href=""> PROCESS</a>
            </li>
            <li>
              <a href=""> CONTACT US</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
