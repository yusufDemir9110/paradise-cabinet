import { collection, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import db from "../firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function ProductDetailImg() {
  const [images, setImages] = useState([]);

  const [current, setCurrent] = useState(0);
  const length = images.length;
  let imageName = useLocation();

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    onSnapshot(
      collection(db, "product-detail-images-" + imageName.state.state),
      (snapshot) =>
        setImages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
    );
  }, []);
  return (
    <section className="productDetailSection">
      {images.map(({ id, data }, index) => (
        <div className={index === current ? "data active" : "data"} key={id}>
          {index === current && (
            <div className="slideImageContainer">
              <img src={data.image}></img>

              <button id="prevButton" onClick={prevSlide}>
                <FontAwesomeIcon className="chevron" icon={faChevronLeft} />
              </button>
              <button id="nextButton" onClick={nextSlide}>
                <FontAwesomeIcon className="chevron" icon={faChevronRight} />
              </button>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

export default ProductDetailImg;
