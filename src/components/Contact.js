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
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [progres, setProgres] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  function handleChange(e) {
    message[e.target.id] = e.target.value;
    setMessage({ ...message, message });

    if (message.name !== "" && message.phone !== "" && checked === true) {
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
    setChecked(false);
    setImageUrl("");
    setDisabled(true);
    setProgres(0);
  };

  return (
    <div className="formContainer">
      <h1>Contact Us</h1>

      <div className="formItems">
        <div>
          <label htmlFor="name">
            Name*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              required
              type="text"
              id="name"
              value={message.name}
              onChange={handleChange}
              placeholder="Full Name"
            ></input>
          </label>
        </div>
        <div>
          <label htmlFor="topic">
            Phone Number*
            <input
              required
              type="tel"
              id="phone"
              value={message.phone}
              onChange={handleChange}
              placeholder="+95____________"
            ></input>
          </label>
        </div>

        <div>
          <label htmlFor="email">
            E-mail&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              required
              type="email"
              id="email"
              value={message.email}
              onChange={handleChange}
              placeholder="____@________"
            ></input>
          </label>
        </div>
        <div>
          <label htmlFor="messageText">
            Message&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
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
        <div>
          <label htmlFor="imageForm">
            Image&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <form id="imageForm" onSubmit={imageHandler}>
              <input id="file" type="file"></input>
              <button type="submit">Upload</button>
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
          {progres === 100 ? <p>Your image has been uploaded</p> : <p></p>}
        </div>
      </div>
      <div className="policy">
        <input type="checkbox" onChange={handleChange} checked={checked} />
        <span>
          I accept&nbsp;
          <Link to="/privacy">Privacy Policy</Link>
        </span>
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
