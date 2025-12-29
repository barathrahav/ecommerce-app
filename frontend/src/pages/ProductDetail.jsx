import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductBySlug } from "../services/product.service";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductBySlug(slug);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  if (loading) {
    return <p className="p-6">Loading product...</p>;
  }

  if (!product) {
    return <p className="p-6">Product not found.</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image */}
      <div>
        <img
          src={product.images?.[0] || "https://via.placeholder.com/500"}
          alt={product.title}
          className="w-full h-96 object-cover rounded"
        />
      </div>

      {/* Details */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="text-xl text-green-600 font-semibold mb-4">
          ₹{product.price}
        </p>

        <p className="text-gray-700 mb-6">{product.description}</p>

        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
