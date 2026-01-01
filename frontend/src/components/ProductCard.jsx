import { Link, useNavigate } from "react-router-dom";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
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
    <div className="group border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition">
      {/* IMAGE SECTION */}
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.slug}`}>
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition"></div>

        {/* WISHLIST ICON (TOP RIGHT) */}
        <button
          className="absolute top-3 right-3 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-white"
          title="Add to wishlist"
        >
          <HeartIcon className="w-5 h-5 text-gray-800" />
        </button>
      </div>

      {/* PRODUCT INFO */}
      <div className="p-4 text-center">
        <Link
          to={`/products/${product.slug}`}
          className="block font-medium text-gray-800 hover:text-blue-600"
        >
          {product.title}
        </Link>

        {/* STAR RATING */}
        <div className="flex justify-center my-2 text-yellow-400">★★★★☆</div>

        {/* PRICE */}
        <p className="text-lg font-semibold text-gray-900 mb-3">
          ₹{product.price}
        </p>

        {/* ADD TO CART (SHOW ONLY ON HOVER) */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="
            w-full flex items-center justify-center gap-2
            bg-blue-600 text-white py-2 rounded
            opacity-0 group-hover:opacity-100
            transform translate-y-2 group-hover:translate-y-0
            transition-all duration-300
            hover:bg-blue-700
            disabled:bg-gray-400 disabled:cursor-not-allowed
            pointer-events-none group-hover:pointer-events-auto
          "
        >
          <ShoppingCartIcon className="w-5 h-5 text-white" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
