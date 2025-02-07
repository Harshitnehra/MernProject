import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets.js";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-md relative">
      {/* Logo */}
      <NavLink to="/" className="text-2xl font-bold text-blue-600">
        HealthCare
      </NavLink>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-lg font-medium ${
              isActive
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/doctor"
          className={({ isActive }) =>
            `text-lg font-medium ${
              isActive
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`
          }
        >
          All Doctors
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-lg font-medium ${
              isActive
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`
          }
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `text-lg font-medium ${
              isActive
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`
          }
        >
          Contact
        </NavLink>
      </div>

      {/* Profile / Login Button */}
      {token ? (
        <div className="relative">
          <div
            className="flex items-center cursor-pointer space-x-2"
            onClick={() => setShowMenu(!showMenu)}
          >
            <img
              src={assets.profile_pic}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <img
              src={assets.dropdown_icon}
              alt="Dropdown"
              className="w-4 h-4"
            />
          </div>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-10">
              <p
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/my-profile")}
              >
                My Profile
              </p>
              <p
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/my-appointments")}
              >
                My Appointments
              </p>
              <p
                className="px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer"
                onClick={() => setToken(false)}
              >
                Logout
              </p>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Create Account
        </button>
      )}
    </nav>
  );
};

export default Navbar;
