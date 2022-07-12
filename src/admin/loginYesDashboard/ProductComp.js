import React, { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import db, { storage } from "../../firebase/firebase";

function ProductComp() {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    image: "",
  });
  const [progres, setProgres] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [disabled, setDisabled] = useState(true);

  function handleChange(e) {
    product[e.target.id] = e.target.value;
    setProduct({ ...product, product });
    if (product.id !== "" && product.name !== "" && imageUrl !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  const imageHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    const storageRef = ref(storage, `/ProductComp/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
    await setDoc(doc(db, "products-data", product.id), {
      name: product.name,
      image: imageUrl,
    });
    setProduct({
      id: "",
      name: "",
      image: "",
    });
    setImageUrl("");
    setDisabled(true);
    setProgres(0);
  };
  return (
    <div className="bigContainer">
      <h1>Home Page Products</h1>
      <div className="topicImageLoader">
        <form onSubmit={imageHandler}>
          <input type="file"></input>
          <button type="submit">Upload</button>
        </form>
        <h2>Uploaded {progres} %</h2>
      </div>
      <div className="Toporex">
        <div>
          <label for="id">
            Product id
            <input
              required
              type="text"
              id="id"
              value={product.id}
              onChange={handleChange}
              placeholder="Product id"
            ></input>
          </label>
        </div>
        <div>
          <label for="name">
            Product Name
            <input
              required
              type="text"
              id="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Product Name"
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

        <div className="topAddButtonCont">
          <button disabled={disabled} onClick={add}>
            ekle
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductComp;
