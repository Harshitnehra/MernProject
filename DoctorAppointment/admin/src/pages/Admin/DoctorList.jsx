import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/Admincontest";

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeavailable } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">All Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((item, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <div className="text-center">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.speciality}</p>
              <p className="text-gray-500">{item.experience} years experience</p>
              <div className="mt-3 flex items-center justify-center">
                <input 
                  type="checkbox" 
                  checked={item.available} 
                  className="w-4 h-4 mr-2 cursor-pointer" 
                  onChange={() => changeavailable(item._id)}
                />
                <label className="text-gray-700">Available</label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
