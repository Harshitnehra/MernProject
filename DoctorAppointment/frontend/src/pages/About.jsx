import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  return (
    <div className="container mx-auto p-6">
      {/* About Section */}
      <div className="text-center mb-8">
        <p className="text-3xl font-bold text-gray-800">
          About <span className="text-blue-600">US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 bg-white shadow-lg p-6 rounded-lg">
        <img
          src={assets.about_image}
          alt="About Us"
          className="w-full md:w-1/2 h-auto object-cover rounded-lg"
        />
        <div className="md:w-1/2 space-y-4">
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
            velit auctor, ultricies massa non, consectetur neque. Donec in
            ligula et neque vestibulum malesuada.
          </p>
          <p className="text-gray-600">
            Duis congue, mauris vel pulvinar fermentum, dui lectus cursus
            massa, vitae consectetur nunc lectus ut eros.
          </p>
          <b className="text-lg text-gray-800">Our Vision</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
            velit auctor, ultricies massa non, consectetur neque. Donec in
            ligula et neque vestibulum malesuada.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center mt-12 mb-6">
        <p className="text-3xl font-bold text-gray-800">
          Why <span className="text-blue-600">Choose Us</span>
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <b className="text-xl text-gray-800">Efficiency:</b>
          <p className="text-gray-600 mt-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi harum
            optio voluptates officiis.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <b className="text-xl text-gray-800">Convenience:</b>
          <p className="text-gray-600 mt-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum quas
            temporibus ea similique inventore laboriosam illo unde conse.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <b className="text-xl text-gray-800">Personalization:</b>
          <p className="text-gray-600 mt-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam quod
            ullam eaque quasi temporibus sit saepe soluta ipsam dolorem maiores?
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;