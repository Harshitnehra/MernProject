import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom"; // ✅ Corrected import

const Banner = () => {
  const navigate = useNavigate(); // ✅ Ensure correct function call

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-blue-50 py-10 px-6 md:px-16 rounded-lg">
      {/* Left Content */}
      <div className="text-center md:text-left">
        <p className="text-3xl md:text-4xl font-bold text-blue-600">
          Book Appointment
        </p>
        <p className="text-lg text-gray-700 mt-2">
          With 100+ Experienced Doctors
        </p>
        <button
          onClick={() => {navigate("/login"); scrollTo(0,0) }}
          className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Create Account
        </button>
      </div>

      {/* Right Image */}
      <div className="mt-6 md:mt-0">
        <img
          src={assets.appointment_img}
          alt="Appointment"
          className="w-full max-w-sm md:max-w-md"
        />
      </div>
    </div>
  );
};

export default Banner;
