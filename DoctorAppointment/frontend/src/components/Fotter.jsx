import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-10 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div>
          <img src={assets.logo} alt="Logo" className="w-32 mb-4" />
          <p className="text-gray-400 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dicta
            error corporis doloribus, officiis reprehenderit ab omnis facilis
            nam praesentium alias sequi repellat non reiciendis veritatis
            ratione pariatur autem! Quis.
          </p>
        </div>

        {/* Center Section */}     
        <div>
          <p className="text-lg font-semibold mb-3">Company</p>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-blue-500 cursor-pointer">Home</li>
            <li className="hover:text-blue-500 cursor-pointer">About</li>
            <li className="hover:text-blue-500 cursor-pointer">Contact</li>
            <li className="hover:text-blue-500 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-lg font-semibold mb-3">Get in Touch</p>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-blue-500 cursor-pointer">1234567890</li>
            <li className="hover:text-blue-500 cursor-pointer">abc@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} HealthCare. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
