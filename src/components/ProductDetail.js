import React from "react";
import ProductDetailImg from "./ProductDetailImg";
import ProductDetailExplanation from "./ProductDetailExplanation";
import Header from "./Header";
import Footer from "./Footer";
function ProductDetail() {
  return (
    <div>
      <Header />
      <ProductDetailImg />
      <ProductDetailExplanation />
      <Footer />
    </div>
  );
}

export default ProductDetail;
