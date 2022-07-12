import React, { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import db, { storage } from "../../firebase/firebase";
import ProductDetailImgComp from "./ProductDetailImgComp";
import ProductDetailExplanationComp from "./ProductDetailExplanationComp";
function ProductDetailComp() {
  return (
    <div>
      <ProductDetailImgComp />
      <ProductDetailExplanationComp />
    </div>
  );
}

export default ProductDetailComp;
