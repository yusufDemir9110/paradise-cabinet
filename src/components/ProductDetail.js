import React from "react";
import ProductDetailImg from "./ProductDetailImg";
import ProductDetailExplanation from "./ProductDetailExplanation";
import HeaderSecond from "./HeaderSecond";
import Footer from "./Footer";
function ProductDetail() {
  return (
    <div>
      <HeaderSecond />
      <ProductDetailImg />
      <ProductDetailExplanation />
      <Footer />
    </div>
  );
}

export default ProductDetail;
