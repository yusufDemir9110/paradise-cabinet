import React, { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import db, { storage } from "../../firebase/firebase";

function ProductDetailImgComp() {
  const [productImg, setProductImg] = useState({
    id: "",
    image: "",
    productName: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [progres, setProgres] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  function handleChange(e) {
    productImg[e.target.id] = e.target.value;
    setProductImg({ ...productImg, productImg });
    if (
      productImg.id !== "" &&
      productImg.productName !== "" &&
      imageUrl !== ""
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  const imageHandler = (e) => {
    e.preventDefault();
    const image = e.target[0].files[0];
    uploadImages(image);
  };

  const uploadImages = (image) => {
    const storageRefLes = ref(storage, `/productDetail/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRefLes, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgres(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) =>
          setImageUrl(url, imageUrl)
        );
      }
    );
  };

  const add = async (event) => {
    event.preventDefault();
    const newProduct = productImg.productName;

    await setDoc(
      doc(db, "product-detail-images-" + newProduct, productImg.id),
      {
        image: imageUrl,
      }
    );

    setProductImg({
      id: "",
      image: "",
      productName: "",
    });
    setImageUrl("");
    setDisabled(true);
    setProgres(0);
  };
  return (
    <div className="bigContainer">
      <h1>ProductsImg</h1>

      <div>
        <div className="topicImageLoader">
          <form onSubmit={imageHandler}>
            <input type="file"></input>
            <button type="submit">Upload</button>
          </form>
          <h2>Uploaded {progres} %</h2>
        </div>
        <div className="topAndExLabels">
          <div>
            <label for="id">
              Image id &nbsp;&nbsp;&nbsp;&nbsp;
              <input
                required
                type="text"
                id="id"
                value={productImg.id}
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
                value={productImg.productName}
                onChange={handleChange}
                placeholder="Write exactly"
              ></input>
            </label>
            <label for="image">
              Product Image
              <input
                required
                disabled
                type="url"
                id="image"
                value={imageUrl}
                onChange={handleChange}
                placeholder="imageUrl"
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

export default ProductDetailImgComp;
