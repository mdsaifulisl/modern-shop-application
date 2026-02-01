import React from "react";
import data from "../../data/data.json";
import "../../assets/style/home.css"; 
import { useNavigate } from "react-router-dom";

// Icon
import { FaArrowRight } from "react-icons/fa";
import ProductCard from "../ProductCard";

// product Context
import { useProducts } from "../../context/ProductContext";

const Featured = () => {
const { products = [] } = useProducts(); // products array
const productss = products.slice(0, 8);  // প্রথম ৮টি product


  const Naviget = useNavigate()

  const handleClick = (id) => {
    Naviget(`/details/${id}`)
  }

  const handelShop = () => {
    Naviget("/shop")
  }

  return (
    <section className="featured-section section">
      <div className="container-fluid">
        <h2 className="section-title">Featured Products</h2>

        <div className="row g-lg-4 g-1 pb-0 pb-md-3 pb-lg-5 ">
          <ProductCard filteredProducts={productss} handleDetails={handleClick} />
        </div>

        <div className="text-center mt-5">
          <button onClick={handelShop} className="btn btn-outline">View All Products <FaArrowRight className="ms-2" /></button>
        </div>
      </div>
    </section>
  );
};

export default Featured; 


