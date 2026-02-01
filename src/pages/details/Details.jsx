import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/style/details.css";

// Components
import Loader from "../../components/Loader";

// Context
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getByProductId } = useProducts();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [bgPosition, setBgPosition] = useState("center");

  useEffect(() => {
    const loadProduct = async () => {
      const data = await getByProductId(id);
      setProduct(data);
    };
    loadProduct();
  }, [id, getByProductId]);

  if (!product) return <Loader />;

  const hasDiscount =
    product.discount_price > 0 && product.discount_price < product.price;

  const displayPrice = hasDiscount ? product.discount_price : product.price;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBgPosition(`${x}% ${y}%`);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return false;
    }

    const cartItem = {
      id: product._id,
      productName: product.productName,
      price: displayPrice,
      image: product.image,
    };

    addToCart(cartItem, selectedSize, quantity);
    setSelectedSize("");
    alert("Product added to cart");
    return true;
  };

  const handleOrderNow = () => {
    const success = handleAddToCart();
    if (success) navigate("/checkout");
  };


  return (
    <section className="product-details section">
      <div className="container">
        <div className="row g-4 align-items-center">
          {/* Image */}
          <div className="col-md-6">
            <div
              className="zoom-image"
              style={{
                backgroundImage: `url(${product.image})`,
                backgroundPosition: bgPosition,
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setBgPosition("center")}
            >
              <img src={product.image} alt={product.productName} />
            </div>
          </div>

          {/* Info */}
          <div className="col-md-6">
            <h4 className="mb-3">{product.productName}</h4>
            <div className="mb-3">
              <span className="discount-price fs-4">৳ {displayPrice}</span>
              {hasDiscount && (
                <span className="original-price ms-3">৳ {product.price}</span>
              )}
            </div>
            {/* Sizes */}
            <div className="mb-3">
              <strong className="d-block mb-2">Select Size</strong>
              <div className="size-options">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${
                      selectedSize === size ? "active" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            {/* Quantity */}
            <div className="mb-3 d-flex align-items-center gap-3">
              <strong>Quantity:</strong>
              <div className="qty-control">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="qty-number">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>
            {product.stock <= 0 && <p>Out of Stock</p>} <br />
            {/* Buttons */}
            <div className="d-flex gap-3">
              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                Add to Cart
              </button>
              <button
                className="btn btn-primary"
                onClick={handleOrderNow}
                disabled={product.stock <= 0}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>

        <hr className="my-5" />

        <div>
          <h6 className="mb-3">{product.productName}</h6>
          <p>{product.description}</p>
        </div>
      </div>
    </section>
  );
};

export default Details;
