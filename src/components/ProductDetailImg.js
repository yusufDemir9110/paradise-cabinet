import { collection, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import db from "../firebase/firebase";

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
      collection(db, "product-detail-images" + imageName.state.state),
      (snapshot) =>
        setImages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
    );
    console.log(imageName.state.state);
  }, []);
  return (
    <div>
      <div className="mainSlide">
        {images.map(({ id, data }, index) => (
          <div className={index === current ? "data active" : "data"} key={id}>
            {index === current && (
              <div className="slide">
                <div className="dataImageLesson">
                  <img src={data.image}></img>
                </div>

                <div className="buttonCont">
                  <button onClick={prevSlide}>Prev</button>
                  <button onClick={nextSlide}>Next</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetailImg;
