import React from "react";
import Contact from "./Contact";
import styles from "../styles/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <div>
      <footer>
        <div className="footerTop">
          <Contact />
          <div className="map">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49071.04629416618!2d-121.64507151015793!3d39.76344668812947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80832bd49578303f%3A0x50c92f9d6b33aa70!2sParadise%2C%20Kaliforniya%2095969%2C%20Amerika%20Birle%C5%9Fik%20Devletleri!5e0!3m2!1str!2snl!4v1657037734452!5m2!1str!2snl"
              width="450"
              height="500"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            <h4>
              <FontAwesomeIcon className="faPhone" icon={faLocationDot} />{" "}
              Paradise CA, California
            </h4>
            <h4>
              <a href="tel:+15307333667">
                <FontAwesomeIcon className="faPhone" icon={faPhone} />
                <span>530 733 3667</span>
              </a>
            </h4>
            <h4>
              <a href="mailto:paradisecabinetca@gmail.com">
                <FontAwesomeIcon className="faPhone" icon={faEnvelope} />
                paradisecabinetca@gmail
              </a>
            </h4>
          </div>
        </div>
        <div className="footerBottom">
          <p>
            ©2022 Paradise Cabinet - This website has designed by&nbsp;
            <a
              href="https://www.linkedin.com/in/yusuf-demir-91439719b/"
              target="_blank"
            >
              Yusuf Demir
            </a>
            &nbsp;and&nbsp;
            <a
              href="https://www.linkedin.com/in/fatih-sancaktar-2524691b1/"
              target="_blank"
            >
              Fatih Sancaktar
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
