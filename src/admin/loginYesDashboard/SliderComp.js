import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import db, { storage } from "../../firebase/firebase";
import "../../styles/admin.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function SliderComp() {
  const [slideItem, setSlideItem] = useState({
    name: "",
    altText: "",
    image: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [progres, setProgres] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  function handleChange(e) {
    slideItem[e.target.id] = e.target.value;
    setSlideItem({ ...slideItem, slideItem });

    if (imageUrl !== "") {
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
    const storageRefLes = ref(storage, `/slider/${image.name}`);
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

    await addDoc(collection(db, "slides-data"), {
      name: slideItem.name,
      altText: slideItem.altText,
      image: imageUrl,
    });

    setSlideItem({
      name: "",
      altText: "",
      image: "",
    });
    setImageUrl("");
    setDisabled(true);
    setProgres(0);
  };

  return (
    <div>
      <h1>Slider</h1>

      <div>
        <div>
          <form onSubmit={imageHandler}>
            <input type="file"></input>
            <button type="submit">Upload</button>
          </form>
          <h2>Uploaded {progres} %</h2>
        </div>
        <label for="name">
          Product Name
          <input
            required
            type="text"
            id="name"
            value={slideItem.name}
            onChange={handleChange}
            placeholder="Product Name"
          ></input>
        </label>
        <input
          required
          type="text"
          id="altText"
          value={slideItem.altText}
          onChange={handleChange}
          placeholder="altText"
        ></input>
        <input
          required
          disabled
          type="url"
          id="image"
          value={imageUrl}
          onChange={handleChange}
        ></input>

        <button disabled={disabled} onClick={add}>
          ekle
        </button>
      </div>
    </div>
  );
}

export default SliderComp;
