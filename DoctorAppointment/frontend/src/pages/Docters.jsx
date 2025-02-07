import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext"; // Import the context
import { useParams } from "react-router-dom";
const Docters = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  return (
    <div>
      <p>Browser through the doctors speciality</p>
      <div>
        <div>
          <p>General Physician</p>
          <p>Gynecologist</p>
          <p>Dermatologist</p>
          <p>Pediatrician</p>
          <p>Neurologist</p>
          <p>Gastroenterologist</p>
        </div>
        <div>
          {
            filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointments/${item._id}`)} // Navigate to the doctor's appointment page
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Available</p>
                    <span className="text-green-500 font-semibold">✔</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800 mt-2">{item.name}</p>
                  <p className="text-gray-600">{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Docters;
