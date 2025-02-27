import React, { useContext } from "react";
import { assets } from "../assets_admin/assets";
import { AdminContext } from "../context/Admincontest";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/Doctorcontext";

const Navbar = () => {
  const { aToken, setAtoken } = useContext(AdminContext);
  const {dtoken, setDToken} = useContext(DoctorContext)
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    aToken && setAtoken("");
    aToken && localStorage.removeItem("aToken");
    dtoken && setDToken("");
    dtoken && localStorage.removeItem("dtoken");
  };
  return (
    <div className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={assets.admin_logo} alt="Admin Logo" className="w-16 h-16" />{" "}
          {/* Increased size */}
          <p className="text-black font-semibold text-lg">
            {aToken ? "Admin" : "Doctor"}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
