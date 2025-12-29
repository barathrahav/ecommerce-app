import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/order.service";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    try {
      setLoading(true);

      const orderPayload = {
        items: cart.map((item) => ({
          productId: item._id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount,
      };

      await createOrder(orderPayload);

      clearCart();
      navigate("/orders");
    } catch (error) {
      alert("Order creation failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return <p className="p-6">Your cart is empty.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      <div className="bg-white p-4 rounded shadow">
        <p className="text-lg font-semibold mb-2">
          Total: ₹{totalAmount}
        </p>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
