import { collection, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import db from "../firebase/firebase";
import styles from "../styles/productDetail.css";

function ProductDetailExplanation() {
  const [features, setFeatures] = useState([]);
  let imageName = useLocation();
  useEffect(() => {
    onSnapshot(
      collection(db, "product-detail-features-" + imageName.state.state),
      (snapshot) =>
        setFeatures(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
    );
  }, []);
  return (
    <div className="productDetailExplanation">
      {features.map(({ id, data }) => (
        <div key={id}>
          <table>
            <thead>
              <tr>
                <th colSpan={2}>Product Features</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <strong> Door:</strong>
                </th>
                <td>{data.door}</td>
              </tr>

              <tr>
                <th>
                  <strong> Door Style:</strong>
                </th>
                <td>{data.doorStyle}</td>
              </tr>
              <tr>
                <th>
                  <strong> Finish:</strong>
                </th>
                <td>{data.finish}</td>
              </tr>
              <tr>
                <th>
                  <strong> Face Frame</strong>
                </th>
                <td>{data.faceFrame}</td>
              </tr>
              <tr>
                <th>
                  <strong> Drawer Front:</strong>
                </th>
                <td>{data.drawerFront}</td>
              </tr>
              <tr>
                <th>
                  <strong> Box Material:</strong>
                </th>
                <td>{data.boxMaterial}</td>
              </tr>
              <tr>
                <th>
                  <strong> Shelves:</strong>
                </th>
                <td>{data.shelves}</td>
              </tr>
              <tr>
                <th>
                  <strong> Drawer Box:</strong>
                </th>
                <td>{data.drawerBox}</td>
              </tr>
              <tr>
                <th>
                  <strong> Drawer Glides:</strong>
                </th>
                <td>{data.drawerGlides}</td>
              </tr>
              <tr>
                <th>
                  <strong> Hinges:</strong>
                </th>
                <td>{data.hinges}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default ProductDetailExplanation;
