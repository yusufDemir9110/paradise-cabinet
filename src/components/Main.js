import React from "react";
import styles from "../styles/main.css";
import images from "../data/slideData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import paradiseLogo from "../assets/paradiseLogo.png";
import products from "../data/productData";
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
  return (
    <main>
      <article>
        <div className="textContainer">
          <h1>Best choise for your kitchens</h1>
        </div>
        <Slider className="slider" {...settings}>
          {images.map((item) => (
            <div key={item.id}>
              <img className="slideImages" src={item.src} alt={item.alt} />
            </div>
          ))}
        </Slider>
      </article>
      <section>
        <div className="about">
          <h2>About us</h2>
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
      <article>
        <h1>Cabinets</h1>
        <div className="topicCont">
          {products.map((item) => (
            <div
              key={item.id}
              className="topic"
              style={{ backgroundImage: "url(" + item.image + ")" }}
            >
              <div className="topic_name">{item.productName}</div>
              <div className="topic_desc_bg">
                <div>
                  <div className="topic_desc" id="topic_desc_1">
                    &gt; {item.description1}
                  </div>
                  <div className="topic_desc" id="topic_desc_2">
                    &gt; {item.description2}
                  </div>
                  <div className="topic_desc" id="topic_desc_3">
                    &gt; {item.description3}
                  </div>
                  <div className="topic_desc" id="topic_desc_4">
                    &gt; {item.description4}
                  </div>
                </div>

                <div className="topic_desc" id="topic_desc_5">
                  <a>
                    <button className="buttonTop">Detail</button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>
      <section className="progressContainer">
        <h1>Progress</h1>
        <div className="progressAnimation">
          <div className="aniItemRight">
            <FontAwesomeIcon className="aniItemIcon" icon={faAddressBook} />
            <FontAwesomeIcon
              className="faEllipsisVertical"
              icon={faEllipsisVertical}
            />
            <h3>Contact</h3>
          </div>
          <div className="aniItemLeft">
            <FontAwesomeIcon className="aniItemIcon" icon={faPenRuler} />
            <FontAwesomeIcon
              className="faEllipsisVertical"
              icon={faEllipsisVertical}
            />
            <h3>Design</h3>
          </div>
          <div className="aniItemRight">
            <FontAwesomeIcon className="aniItemIcon" icon={faCalendarDays} />
            <FontAwesomeIcon
              className="faEllipsisVertical"
              icon={faEllipsisVertical}
            />
            <h3>Schedule</h3>
          </div>
          <div className="aniItemLeft">
            <FontAwesomeIcon className="aniItemIcon" icon={faTruck} />
            <FontAwesomeIcon
              className="faEllipsisVertical"
              icon={faEllipsisVertical}
            />
            <h3>Delivery</h3>
          </div>
          <div className="aniItemRight">
            <FontAwesomeIcon className="aniItemIcon" icon={faPuzzlePiece} />
            <FontAwesomeIcon
              className="faEllipsisVertical"
              icon={faEllipsisVertical}
            />
            <h3>Installation</h3>
          </div>
          <div className="aniItemLeft">
            <FontAwesomeIcon className="aniItemIcon" icon={faFlagCheckered} />
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
