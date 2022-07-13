import React from "react";
import logo from "../assets/logo.png";
import paradiseLogo from "../assets/paradiseLogo.png";
import whatsappLogo from "../assets/whatsapp3.png";
import styles from "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="spaceBetween">
      <div className="headerLeft">
        <Link to={"/"}>
          <img className="headerLogo" src={paradiseLogo} alt="paradiseLogo" />
        </Link>
      </div>
      <div className="headerRight">
        <div className="headerTopRight">
          <a href="mailto:paradisecabinetca@gmail.com">
            <FontAwesomeIcon className="faEnvelope" icon={faEnvelope} />
          </a>
          <a href="tel:+15307333667">
            <FontAwesomeIcon className="faPhone" icon={faPhone} />
            <span>530 733 3667</span>
          </a>
          <a href="https://api.whatsapp.com/send?phone=15307333667">
            <img className="whatsappLogo" src={whatsappLogo} alt="" />
          </a>
        </div>

        <nav>
          <ul>
            <li>
              <a href="#aboutContainer"> About</a>
            </li>
            <li>
              <a href="#cabinetContainer"> Cabinets</a>
            </li>
            <li>
              <a href="#processContainer"> Process</a>
            </li>
            <li>
              <a href="#formContainer"> Contact Us</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
