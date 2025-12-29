import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login or register to add products to cart");
      navigate("/login");
      return;
    }

    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
      <img
        src={product.images?.[0] || "https://via.placeholder.com/300"}
        alt={product.title}
        className="h-48 w-full object-cover rounded mb-3"
      />

      <h3 className="text-lg font-semibold">{product.title}</h3>
      <p className="text-gray-600 mt-1">₹{product.price}</p>
      <button
        onClick={handleAddToCart}
        className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Add to Cart
      </button>

      <Link
        to={`/products/${product.slug}`}
        className="inline-block mt-3 text-blue-600 hover:underline"
      >
        View details →
      </Link>
    </div>
  );
};

export default ProductCard;
