import React, { useContext } from "react"; // Import useContext from React
import { AppContext } from "../context/AppContext"; // Import the context
import { useNavigate } from "react-router-dom";

const Todoctor = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext); // Access doctors from context

   
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-center text-blue-600">
        Top Doctors to Book
      </h1>
      <p className="text-gray-600 text-center mt-2">
        Easily book doctor appointments online with trusted professionals near you.
      </p>

      {/* Doctors List */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.slice(0, 10).map((item, index) => (
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
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <button
        onClick={()=>{navigate("/doctors") ; scrollTo(0,0)}}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Todoctor;
