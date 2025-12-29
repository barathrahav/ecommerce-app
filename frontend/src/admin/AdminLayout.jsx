import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const { user } = useAuth();

  const navClass = ({ isActive }) =>
    `block px-4 py-2 rounded-full transition
     ${
       isActive
         ? "bg-blue-600 text-white"
         : "text-gray-300 hover:bg-gray-700 hover:text-white"
     }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

        <nav className="flex flex-col gap-3">
          <NavLink to="/admin/products" className={navClass}>
            Products
          </NavLink>
          <NavLink to="/admin/orders" className={navClass}>
            Orders
          </NavLink>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <header className="sticky top-0 z-40 bg-white shadow px-6 py-3 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <span className="text-sm text-gray-600">
            Admin: <b>{user?.name}</b>
          </span>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
