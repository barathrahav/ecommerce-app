import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <Link to="/products" className="text-blue-600 underline">
          Go to products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between bg-white p-4 rounded shadow"
          >
            {/* Left */}
            <div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600">₹{item.price}</p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseQty(item._id)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                −
              </button>

              <span className="font-semibold">{item.quantity}</span>

              <button
                onClick={() => increaseQty(item._id)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                +
              </button>
            </div>

            {/* Right */}
            <div className="text-right">
              <p className="font-bold">
                ₹{item.price * item.quantity}
              </p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-600 text-sm mt-1"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Clear Cart
        </button>

        <div className="text-right">
          <p className="text-xl font-bold">Total: ₹{total}</p>
          <Link
            to="/checkout"
            className="inline-block mt-2 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
