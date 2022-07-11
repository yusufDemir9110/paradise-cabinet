import { collection, onSnapshot, addDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import db, { storage } from "../../firebase/firebase";
import "../../styles/admin.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [slideItem, setSlideItem] = useState({
    altText: "",
    image: "",
    caption: "",
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
      altText: slideItem.altText,
      image: imageUrl,
      caption: slideItem.caption,
    });

    setSlideItem({
      altText: "",
      caption: "",
      image: "",
    });
    setImageUrl("");
    setDisabled(true);
    setProgres(0);
  };

  useEffect(() => {
    onSnapshot(collection(db, "messages"), (snapshot) =>
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);
  return (
    <div>
      <div>
        {messages.map(({ id, data }) => (
          <div key={id}>
            <div>{data.name}</div>
            <div>{data.phone}</div>
            <div>{data.email}</div>
            <div>{data.messageText}</div>
            <div>
              <img src={data.image} />
            </div>
          </div>
        ))}
      </div>
      <div>
        <h1>Carslider</h1>

        <div>
          <div>
            <form onSubmit={imageHandler}>
              <input type="file"></input>
              <button type="submit">Upload</button>
            </form>
            <h2>Uploaded {progres} %</h2>
          </div>
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
          <input
            required
            type="text"
            id="caption"
            value={slideItem.caption}
            onChange={handleChange}
            placeholder="caption"
          ></input>

          <button disabled={disabled} onClick={add}>
            ekle
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
