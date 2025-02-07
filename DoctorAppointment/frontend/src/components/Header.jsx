import React from "react";
import { assets } from "../assets/assets_frontend/assets.js";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-10 bg-gray-100">
      {/* Left Side */}
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <p className="text-4xl font-bold text-blue-600 leading-snug">
          Your Health, <br /> Your Schedule
        </p>

        {/* Description with Profile Images */}
        <div className="flex items-center justify-center md:justify-start space-x-4">
          <img src={assets.group_profiles} alt="Profiles" className="w-16 h-16 rounded-full" />
          <p className="text-lg text-gray-700">
            Find the best doctors and schedule appointments hassle-free. Your health, our priority!
          </p>
        </div>

        {/* Book Appointment Button */}
        <a
          href="#Speciality"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Book Appointment
          <img src={assets.arrow_icon} alt="Arrow" className="ml-2 w-5 h-5" />
        </a>
      </div>

      {/* Right Side - Header Image */}
      <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
        <img src={assets.header_img} alt="Doctor Consultation" className="w-full max-w-md rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default Header;
