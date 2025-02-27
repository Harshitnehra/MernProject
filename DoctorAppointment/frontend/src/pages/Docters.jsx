import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext"; // Import the context
import { useNavigate, useParams } from "react-router-dom";

const Docters = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);

  const navigate = useNavigate(); // Access the useNavigate hook from react-router-dom

  const applyfilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyfilter(); // Apply filter when component mounts or when speciality changes
  }, [speciality, doctors]);

  return (
    <div className="container mx-auto p-6">
      <p className="text-xl font-semibold text-gray-700 mb-4">
        Browse through the doctors' specialities
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Speciality Filter Sidebar */}
        <div className="flex flex-col space-y-2 bg-gray-100 p-4 rounded-lg shadow-md">
          {[
            "General Physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((spec) => (
            <p
              key={spec}
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() =>
                speciality === spec ? navigate("/doctor") : navigate(`/doctor/${spec}`)
              }
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctor List */}
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterDoc.length > 0 ? (
            filterDoc.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/appointments/${item._id}`)} // Navigate to the doctor's appointment page
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm ${item.available ? "text-green-500" : "text-red-500"}`}>
                      {item.available ? "Available" : "Not Available"}
                    </p>
                    <span className={item.available ? "text-green-500" : "text-red-500"}>✔</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800 mt-2">{item.name}</p>
                  <p className="text-gray-600">{item.speciality}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No doctors available in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Docters;
