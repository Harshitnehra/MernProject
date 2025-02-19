import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(doctorsData);
    }
  }, [docId, speciality, doctors]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        Top Doctors to Book
      </h1>
      <p className="text-gray-600 text-center mt-2">
        Easily book doctor appointments online with trusted professionals near you.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointments/${item._id}` ,scrollTo(0,0))}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-lg" />
            <p className="text-lg font-semibold text-gray-800 mt-2">{item.name}</p>
            <p className="text-gray-600">{item.speciality}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
