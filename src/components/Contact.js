import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import db, { storage } from "../firebase/firebase";
import "../styles/admin.css";
import { Link } from "react-router-dom";

function Contact() {
  const [message, setMessage] = useState({
    name: "",
    phone: "",
    email: "",
    messageText: "",
    image: "",
  });

  const [disabled, setDisabled] = useState(true);
  const [progres, setProgres] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  function handleChange(e) {
    message[e.target.id] = e.target.value;
    setMessage({ ...message, message });

    if (message.name !== "" && message.phone !== "") {
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
    const storageRefLes = ref(storage, `/photos/${image.name}`);
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
    await addDoc(collection(db, "messages"), {
      name: message.name,
      phone: message.phone,
      email: message.email,
      messageText: message.messageText,
      image: imageUrl,
    });
    setMessage({
      name: "",
      phone: "",
      email: "",
      messageText: "",
      image: "",
    });

    setImageUrl("");
    setDisabled(true);
    setProgres(0);
  };

  return (
    <div className="formContainer" id="formContainer">
      <h1>Contact Us</h1>
      <hr />
      <div className="formItems">
        <div>
          <label htmlFor="name">
            <input
              required
              type="text"
              id="name"
              value={message.name}
              onChange={handleChange}
              placeholder="Full Name*"
            ></input>
          </label>
        </div>
        <div>
          <label htmlFor="topic">
            <input
              required
              type="tel"
              id="phone"
              value={message.phone}
              onChange={handleChange}
              placeholder="Phone Number*"
            ></input>
          </label>
        </div>

        <div>
          <label htmlFor="email">
            <input
              required
              type="email"
              id="email"
              value={message.email}
              onChange={handleChange}
              placeholder="E-mail"
            ></input>
          </label>
        </div>
        <div>
          <label htmlFor="messageText">
            <textarea
              className="textAreaArea"
              required
              id="messageText"
              value={message.messageText}
              onChange={handleChange}
              placeholder="Message"
              cols="21"
            ></textarea>
          </label>
        </div>
        <div className="uploadContainer">
          <label htmlFor="imageForm">
            <form id="imageForm" onSubmit={imageHandler}>
              <div className="doubleButton">
                <input id="unvisibleButton" type="file"></input>
                <button id="chooseImage">Choose Image</button>
              </div>
              <button type="submit" id="uploadImage">
                Upload Image
              </button>
            </form>
          </label>
          {progres === 0 ? <p></p> : <p>Uploaded {progres} %</p>}

          <label htmlFor="image">
            <input
              required
              disabled
              type="url"
              id="image"
              value={imageUrl}
              onChange={handleChange}
            ></input>
          </label>
        </div>
      </div>
      <div className="policy">
        I confirm that I have read&nbsp;
        <Link to="/privacy">Privacy Policy</Link>&nbsp;and I agree to the use of
        my data in line therewith.
      </div>
      <div className="sendButton">
        <button disabled={disabled} onClick={add}>
          Send Message
        </button>
      </div>
    </div>
  );
}

export default Contact;
