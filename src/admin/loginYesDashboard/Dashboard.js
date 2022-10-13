import { collection, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import db from "../../firebase/firebase";
import "../../styles/admin.css";
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
      <div className="receivedMessages">
        {messages.map(({ id, data }) => (
          <div className="receivedMessagesCard" key={id}>
            <div>
              <span>
                <strong>Full Name:</strong>&nbsp;
              </span>
              {data.name}
            </div>
            <div>
              <span>
                <strong>Phone Number:</strong>&nbsp;
              </span>
              {data.phone}
            </div>
            <div>
              <span>
                <strong>E-mail:</strong>&nbsp;
              </span>
              {data.email}
            </div>
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
