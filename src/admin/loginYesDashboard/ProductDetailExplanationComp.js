import React, { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import db from "../../firebase/firebase";

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
        door: productFeature.door,
        doorStyle: productFeature.doorStyle,
        finish: productFeature.finish,
        faceFrame: productFeature.faceFrame,
        drawerFront: productFeature.drawerFront,
        boxMaterial: productFeature.boxMaterial,
        shelves: productFeature.shelves,
        drawerBox: productFeature.drawerBox,
        drawerGlides: productFeature.drawerGlides,
        hinges: productFeature.hinges,
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
            <label for="productName">
              Product Name
              <input
                required
                type="text"
                id="productName"
                value={productFeature.productName}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
        </div>
        <div>
          <div>
            <label for="door">
              Door
              <input
                required
                type="text"
                id="door"
                value={productFeature.door}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
          <div>
            <label for="doorStyle">
              Door Style
              <input
                required
                type="text"
                id="doorStyle"
                value={productFeature.doorStyle}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
          <div>
            <label for="finish">
              Finish
              <input
                required
                type="text"
                id="finish"
                value={productFeature.finish}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
          <div>
            <label for="faceFrame">
              Face Frame
              <input
                required
                type="text"
                id="faceFrame"
                value={productFeature.faceFrame}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
          <div>
            <label for="drawerFront">
              Drawer Front
              <input
                required
                type="text"
                id="drawerFront"
                value={productFeature.drawerFront}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
          <div>
            <label for="boxMaterial">
              Box Material
              <input
                required
                type="text"
                id="boxMaterial"
                value={productFeature.boxMaterial}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
          <div>
            <label for="shelves">
              Shelves
              <input
                required
                type="text"
                id="shelves"
                value={productFeature.shelves}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
          <div>
            <label for="drawerBox">
              Drawer Box
              <input
                required
                type="text"
                id="drawerBox"
                value={productFeature.drawerBox}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
          <div>
            <label for="drawerGlides">
              Drawer Glides
              <input
                required
                type="text"
                id="drawerGlides"
                value={productFeature.drawerGlides}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
          </div>
          <div>
            <label for="hinges">
              Hinges
              <input
                required
                type="text"
                id="hinges"
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
