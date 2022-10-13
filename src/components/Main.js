import React, { useState, useEffect } from "react";
import db from "../firebase/firebase";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import styles from "../styles/main.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import paradiseLogo from "../assets/paradiseLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faCalendarDays,
  faPenRuler,
  faTruck,
  faPuzzlePiece,
  faFlagCheckered,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

function Main() {
  const settings = {
    className: "center",
    centerMode: true,
    slidesToShow: 3,
    Infinite: true,
    dots: true,
    speed: 1000,
    initialSlide: 2,
    previousBtn: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const settings2 = {
    className: "center",
    centerMode: true,
    slidesToShow: 1,
    Infinite: true,
    dots: true,
    speed: 1000,
    initialSlide: 2,
    previousBtn: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const [slides, setSlides] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "slides-data"), (snapshot) =>
      setSlides(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    onSnapshot(collection(db, "products-data"), (snapshot) =>
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  return (
    <main>
      <article>
        <div className="sliderOne">
          <Slider {...settings}>
            {slides.map(({ data, id }) => (
              <div key={id}>
                <Link to={"/productDetail"} state={{ state: data.name }}>
                  <img
                    className="slideImages"
                    src={data.image}
                    alt={data.altText}
                  />
                </Link>
              </div>
            ))}
          </Slider>
        </div>
        <div className="sliderTwo">
          <Slider {...settings2}>
            {slides.map(({ data, id }) => (
              <div key={id}>
                <Link to={"/productDetail"} state={{ state: data.name }}>
                  <img
                    className="slideImages"
                    src={data.image}
                    alt={data.altText}
                  />
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </article>
      <section className="aboutContainer" id="aboutContainer">
        <div className="about">
          <h1>About Us</h1>
          <hr />
          <p>
            Paradise cabinet is local cabinet supplier located in Paradise
            California. We supply high quality assembled cabinets for your
            kitchen and bathroom projects delivered to project location and also
            offer installation service with&nbsp;
            <a href="https://www.mfyconstruction.com/" target="_blank">
              <em> Mfy Construction</em>
            </a>
            .
          </p>
        </div>
        <div className="bigLogo">
          <img src={paradiseLogo} alt="" />
        </div>
      </section>
      <article className="cabinetContainer" id="cabinetContainer">
        <h1>Cabinets</h1>
        <hr />
        <div className="homeProductContainer">
          {products.map(({ id, data }) => (
            <div key={id} className="homeProductItemContainer">
              <Link to={"/productDetail"} state={{ state: data.name }}>
                <div
                  className="homeProductItem"
                  style={{ backgroundImage: "url(" + data.image + ")" }}
                ></div>
                <div className="homeProductName">
                  <h1>{data.name}</h1>{" "}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </article>
      <section className="processContainer" id="processContainer">
        <h1>Process</h1>
        <hr />
        <div className="processAnimation">
          <div className="aniItemRight">
            <div className="icons">
              <div className="aniItemIconContainer">
                <FontAwesomeIcon className="aniItemIcon" icon={faAddressBook} />
              </div>

              <FontAwesomeIcon
                className="faEllipsisVertical"
                icon={faEllipsisVertical}
              />
            </div>

            <div className="processAnimationText">
              <h3>Contact</h3>
              <p>
                Simply fill out the contact form, email or text us. Our company
                will answer you.
              </p>
            </div>
          </div>
          <div className="aniItemLeft">
            <div className="reverse icons">
              <div className="aniItemIconContainer blue">
                <FontAwesomeIcon
                  className="aniItemIconBlue"
                  icon={faCalendarDays}
                />
              </div>
              <FontAwesomeIcon
                className="faEllipsisVertical"
                icon={faEllipsisVertical}
              />
            </div>

            <div className="processAnimationText">
              <h3>Schedule</h3>
              <p>
                We will schedule an appointment for taking measurements and
                presents sample doors and hardware at your location.
              </p>
            </div>
          </div>
          <div className="aniItemRight">
            <div className="icons">
              <div className="aniItemIconContainer orange">
                <FontAwesomeIcon
                  className="aniItemIconOrange"
                  icon={faPenRuler}
                />
              </div>
              <FontAwesomeIcon
                className="faEllipsisVertical"
                icon={faEllipsisVertical}
              />
            </div>

            <div className="processAnimationText">
              <h3>Design</h3>
              <p>
                After completing 3D computer design we will double check the
                measurements and style with you.
              </p>
            </div>
          </div>
          <div className="aniItemLeft">
            <div className="reverse icons">
              <div className="aniItemIconContainer">
                <FontAwesomeIcon className="aniItemIcon" icon={faTruck} />
              </div>
              <FontAwesomeIcon
                className="faEllipsisVertical"
                icon={faEllipsisVertical}
              />
            </div>

            <div className="processAnimationText">
              <h3>Delivery</h3>
              <p>
                Your cabinets will be delivered with care and attention within 2
                weeks, depending on style and cabinet availability.
              </p>
            </div>
          </div>
          <div className="aniItemRight">
            <div className="icons">
              <div className="aniItemIconContainer blue">
                <FontAwesomeIcon
                  className="aniItemIconBlue"
                  icon={faPuzzlePiece}
                />
              </div>
              <FontAwesomeIcon
                className="faEllipsisVertical"
                icon={faEllipsisVertical}
              />
            </div>

            <div className="processAnimationText">
              <h3>Installation</h3>
              <p>
                Your cabinets will be carefully assembled by our professional
                staff. Working clean is our rule.
              </p>
            </div>
          </div>
          <div className="aniItemLeft">
            <div className="reverse icons">
              <div className="aniItemIconContainer orange">
                <FontAwesomeIcon
                  className="aniItemIconOrange"
                  icon={faFlagCheckered}
                />
              </div>
              <FontAwesomeIcon
                className="faEllipsisVertical"
                icon={faEllipsisVertical}
              />
            </div>

            <div className="processAnimationText">
              <h3>Enjoy</h3>
              <p>
                Congratulations! Now you have a new kitchen and your house has a
                new soul. Enjoy with your family and friends!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Main;
