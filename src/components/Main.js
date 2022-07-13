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
    speed: 500,
    initialSlide: 2,
    previousBtn: false,
  };
  const settings2 = {
    className: "center",
    centerMode: true,
    slidesToShow: 1,
    Infinite: true,
    dots: true,
    speed: 500,
    initialSlide: 2,
    previousBtn: false,
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
                <img
                  className="slideImages"
                  src={data.image}
                  alt={data.altText}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="sliderTwo">
          <Slider {...settings2}>
            {slides.map(({ data, id }) => (
              <div key={id}>
                <img
                  className="slideImages"
                  src={data.image}
                  alt={data.altText}
                />
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
            Paradise Cabinet is a subsidiary company of MFY Construction. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Totam quaerat
            quia quos minima deserunt amet accusamus, iure culpa id, maiores,
            autem dicta laboriosam ipsam ex quo sed officiis exercitationem non!
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
                <div className="homeProductName">{data.name}</div>
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
            <div className="aniItemIconContainer">
              <FontAwesomeIcon className="aniItemIcon" icon={faAddressBook} />
            </div>

            <FontAwesomeIcon
              className="faEllipsisVertical"
              icon={faEllipsisVertical}
            />
            <h3>Contact</h3>
          </div>
          <div className="aniItemLeft">
            <div className="aniItemIconContainer blue">
              <FontAwesomeIcon className="aniItemIconBlue" icon={faPenRuler} />
            </div>
            <FontAwesomeIcon
              className="faEllipsisVertical"
              icon={faEllipsisVertical}
            />
            <h3>Design</h3>
          </div>
          <div className="aniItemRight">
            <div className="aniItemIconContainer orange">
              <FontAwesomeIcon
                className="aniItemIconOrange"
                icon={faCalendarDays}
              />
            </div>
            <FontAwesomeIcon
              className="faEllipsisVertical"
              icon={faEllipsisVertical}
            />
            <h3>Schedule</h3>
          </div>
          <div className="aniItemLeft">
            <div className="aniItemIconContainer">
              <FontAwesomeIcon className="aniItemIcon" icon={faTruck} />
            </div>
            <FontAwesomeIcon
              className="faEllipsisVertical"
              icon={faEllipsisVertical}
            />
            <h3>Delivery</h3>
          </div>
          <div className="aniItemRight">
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
            <h3>Installation</h3>
          </div>
          <div className="aniItemLeft">
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
            <h3>Deployment</h3>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Main;
