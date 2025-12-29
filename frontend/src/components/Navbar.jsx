import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `px-4 py-1.5 rounded-full transition-all duration-200
     ${
       isActive
         ? "bg-blue-600 text-white"
         : "text-gray-300 hover:bg-gray-700 hover:text-white"
     }`;

  return (
    <nav
  className={`sticky top-0 z-50 px-6 py-3 text-white flex justify-between items-center transition-shadow
    ${scrolled ? "bg-gray-900 shadow-lg" : "bg-gray-900"}
  `}
>
      {/* LOGO */}
      <Link to="/" className="text-xl font-bold tracking-wide">
        CodeCrest
      </Link>

      {/* CENTER NAV LINKS */}
      <div className="flex items-center gap-3">
        {!user && (
          <>
            <NavLink to="/products" className={navClass}>
              Products
            </NavLink>
            <NavLink to="/login" className={navClass}>
              Login
            </NavLink>
            <NavLink to="/register" className={navClass}>
              Register
            </NavLink>
          </>
        )}

        {user && user.role === "USER" && (
          <>
            <NavLink to="/products" className={navClass}>
              Products
            </NavLink>
            <NavLink to="/orders" className={navClass}>
              Orders
            </NavLink>
            <NavLink to="/cart" className={navClass}>
              Cart ({cartCount})
            </NavLink>
          </>
        )}

        {user && user.role === "ADMIN" && (
          <NavLink to="/admin/products" className={navClass}>
            Admin Panel
          </NavLink>
        )}
      </div>

      {/* PROFILE DROPDOWN (RIGHT SIDE) */}
{user && (
  <div
    className="relative"
    onMouseEnter={() => setOpen(true)}
    onMouseLeave={() => setOpen(false)}
  >
    {/* PROFILE BUTTON */}
    <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-700 transition">
      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
        {user.name?.charAt(0).toUpperCase()}
      </div>
      <span className="text-sm">{user.name}</span>
    </div>

    {/* HOVER BUFFER (IMPORTANT) */}
    <div className="absolute right-0 top-full h-2 w-full"></div>

    {/* DROPDOWN */}
    {open && (
      <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
        <button
          onClick={() => navigate("/account")}
          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          Account
        </button>
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    )}
  </div>
)}
    </nav>
  );
};

export default Navbar;
