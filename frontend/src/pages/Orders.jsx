import React, { useEffect, useState } from "react";
import { fetchMyOrders } from "../services/order.service";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchMyOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to load orders", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return <p className="p-6">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
        <p className="text-gray-600">Place your first order to see it here.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-4 rounded shadow"
          >
            {/* Order header */}
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="font-semibold">
                  Order ID:{" "}
                  <span className="text-gray-600">{order._id}</span>
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-lg">
                  ₹{order.totalAmount}
                </p>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    order.status === "PAID"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {/* Order items */}
            <div className="border-t pt-3 space-y-2">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
