import React from "react";
import { specialityData } from "../assets/assets_frontend/assets.js";
import { Link } from "react-router-dom";

const Specialitymenu = () => {
  return (
    <div id="Speciality" className="text-center py-10 px-4 bg-gray-50">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-blue-600 mb-3">Find by Speciality</h1>
      <p className="text-lg text-gray-600 mb-6">
        Easily book doctor appointments online with trusted professionals near you.
      </p>

      {/* Specialties Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {specialityData.map((item, index) => (
          <Link
          onClick={()=>scrollTo(0,0)}
            key={index}
            to={`/doctor/${item.speciality}`}
            className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-300"
          >
            {/* Circular Image */}
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-100 shadow-md">
              <img
                src={item.image}
                alt={item.speciality}
                className="w-20 h-20 object-cover rounded-full"
              />
            </div>

            {/* Speciality Name */}
            <p className="text-lg font-medium text-gray-700 mt-3">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Specialitymenu;
