import React, { useEffect, useState } from "react";
import api from "../services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const res = await api.get("/orders"); // admin route
    setOrders(res.data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}`, { status });
    loadOrders();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold">Order ID: {order._id}</p>
            <p className="font-semibold">
            User: {order.userId?.name}
            </p>
            <p className="text-sm text-gray-600">
            {order.userId?.email}
            </p>
            <p>Total: ₹{order.totalAmount}</p>
            <p>Status: {order.status}</p>

            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
              className="border mt-2"
            >
              <option>PENDING</option>
              <option>PAID</option>
              <option>SHIPPED</option>
              <option>DELIVERED</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
