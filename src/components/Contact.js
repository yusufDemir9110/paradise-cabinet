import React, { useState, useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import db, { storage } from "../firebase/firebase";
import "../styles/admin.css";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import * as ids from "../email/Emailkey";
import styles from "../styles/footer.css";

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
  const form = useRef();

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
    const storageRefLes = ref(storage, `/messagePhotos/${image.name}`);
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
    await emailjs
      .sendForm(ids.SERVICE_ID, ids.TEMPLATE_ID, form.current, ids.USER_ID)
      .then(
        () => {
          alert(
            "Thank you! Your message has been sent! We will contact you in short time!"
          );
        },
        (error) => {
          alert(error.text);
        }
      );
  };

  return (
    <div className="formContainer" id="formContainer">
      <h1>
        <strong>Contact Us</strong>
      </h1>
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
          <p id="explanation">
            You can add an image to your message. Please, firstly click "Choose
            Image" and choose an image from your device, then click "Upload
            Image"
          </p>
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
          {progres === 0 ? (
            <p id="uploadImagePercentTrans">Image Uploaded {progres} %</p>
          ) : (
            <p id="uploadImagePercent">Image Uploaded {progres} %</p>
          )}

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
        <form ref={form}>
          <div className="formDisplayNone">
            <label>Name</label>
            <input type="text" name="user_name" value={message.name} />
            <label>Phone Number</label>
            <input type="text" name="user_phone" value={message.phone} />
            <label>Email</label>
            <input type="email" name="user_email" value={message.email} />
            <label>Message</label>
            <textarea name="message" value={message.messageText} />
          </div>
          <button type="submit" disabled={disabled} onClick={add}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
