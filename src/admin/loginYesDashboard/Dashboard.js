import { collection, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import db from "../../firebase/firebase";
import "../../styles/admin.css";
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
  );
}

export default Dashboard;
