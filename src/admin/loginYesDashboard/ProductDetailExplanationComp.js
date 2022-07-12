import React, { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import db, { storage } from "../../firebase/firebase";

function ProductDetailExplanationComp() {
  const [productFeature, setProductFeature] = useState({
    id: "",
    productName: "",
    door: "",
    doorStyle: "",
    finish: "",
    faceFrame: "",
    drawerFront: "",
    boxMaterial: "",
    shelves: "",
    drawerBox: "",
    drawerGlides: "",
    hinges: "",
  });
  const [disabled, setDisabled] = useState(true);

  function handleChange(e) {
    productFeature[e.target.id] = e.target.value;
    setProductFeature({ ...productFeature, productFeature });

    if (productFeature.id !== "" && productFeature.productName !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  const add = async (event) => {
    event.preventDefault();
    const newProduct = productFeature.productName;

    await setDoc(
      doc(db, "product-detail-features-" + newProduct, productFeature.id),
      {
        door: "",
        doorStyle: "",
        finish: "",
        faceFrame: "",
        drawerFront: "",
        boxMaterial: "",
        shelves: "",
        drawerBox: "",
        drawerGlides: "",
        hinges: "",
      }
    );

    setProductFeature({
      id: "",
      productName: "",
      door: "",
      doorStyle: "",
      finish: "",
      faceFrame: "",
      drawerFront: "",
      boxMaterial: "",
      shelves: "",
      drawerBox: "",
      drawerGlides: "",
      hinges: "",
    });

    setDisabled(true);
  };
  return (
    <div className="bigContainer">
      <h1>Products Features</h1>

      <div>
        <div className="topAndExLabels">
          <div>
            <label for="id">
              Product Feature Id &nbsp;&nbsp;&nbsp;&nbsp;
              <input
                required
                type="text"
                id="id"
                value={productFeature.id}
                onChange={handleChange}
                placeholder="Id"
              ></input>
            </label>
          </div>
          <div>
            <label for="topic">
              Product Name
              <input
                required
                type="text"
                id="topic"
                value={productFeature.productName}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
        </div>
        <div>
          <div>
            <label for="topic">
              Door
              <input
                required
                type="text"
                id="topic"
                value={productFeature.door}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
          <div>
            <label for="topic">
              Door Style
              <input
                required
                type="text"
                id="topic"
                value={productFeature.doorStyle}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
          <div>
            <label for="topic">
              Finish
              <input
                required
                type="text"
                id="topic"
                value={productFeature.finish}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
          <div>
            <label for="topic">
              Face Frame
              <input
                required
                type="text"
                id="topic"
                value={productFeature.faceFrame}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
          <div>
            <label for="topic">
              Drawer Front
              <input
                required
                type="text"
                id="topic"
                value={productFeature.drawerBox}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
          <div>
            <label for="topic">
              Box Material
              <input
                required
                type="text"
                id="topic"
                value={productFeature.boxMaterial}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
          <div>
            <label for="topic">
              Shelves
              <input
                required
                type="text"
                id="topic"
                value={productFeature.shelves}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
          <div>
            <label for="topic">
              Drawer Box
              <input
                required
                type="text"
                id="topic"
                value={productFeature.drawerBox}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
          <div>
            <label for="topic">
              Drawer Glides
              <input
                required
                type="text"
                id="topic"
                value={productFeature.drawerGlides}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
          <div>
            <label for="topic">
              Hinges
              <input
                required
                type="text"
                id="topic"
                value={productFeature.hinges}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
        </div>

        <div className="topAddButtonCont">
          <button disabled={disabled} onClick={add}>
            ekle
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailExplanationComp;
