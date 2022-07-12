import {
  collection,
  onSnapshot,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import db, { storage } from "../../firebase/firebase";
import "../../styles/admin.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import SliderComp from "./SliderComp";
import ProductComp from "./ProductComp";
import ProductDetailComp from "./ProductDetailComp";
function Dashboard() {
  const [messages, setMessages] = useState([]);

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
      <SliderComp />
      <ProductComp />
      <ProductDetailComp />
    </div>
  );
}

export default Dashboard;
