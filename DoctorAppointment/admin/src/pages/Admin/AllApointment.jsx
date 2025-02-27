import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/Admincontest";

const AllApointment = () => {
  const { appointments, getAllappointment, aToken ,cancelAppiontment} = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllappointment();
    }
  }, [aToken]);

  return (
    <div className="p-6 mx-auto max-w-6xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        All Appointments
      </h2>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-7 bg-gray-100 text-gray-800 font-semibold p-4 border-b text-center">
          <p>#</p>
          <p>Patient</p>
          <p>Gender</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fee</p>
          <p>Action</p>
        </div>

        {/* Appointments List */}
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-7 items-center p-4 border-b odd:bg-white even:bg-gray-50 text-center transition duration-300 hover:bg-gray-100"
            >
              {/* Serial Number */}
              <p className="text-gray-700 font-semibold">{index + 1}</p>

              {/* Patient Info */}
              <div className="flex flex-col items-center">
                <img
                  src={item.userData.image}
                  alt={item.userData.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <p className="text-gray-800 text-sm font-medium mt-1">
                  {item.userData.name}
                </p>
              </div>

              {/* Gender */}
              <p className="text-gray-600 font-medium">{item.userData.gender}</p>

              {/* Date & Time */}
              <p className="text-gray-700 font-semibold">
                {item.slotDate} <br />
                <span className="text-sm text-gray-500">{item.slotTime}</span>
              </p>

              {/* Doctor Info */}
              <div className="flex flex-col items-center">
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <p className="text-gray-800 text-sm font-medium mt-1">
                  {item.docData.name}
                </p>
              </div>

              {/* Fees */}
              <p className="text-green-600 font-bold text-lg">${item.docData.fee}</p>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2">
                {item.cancelled ? (
                  <p className="text-red-600 font-semibold bg-red-100 py-1 px-2 rounded-lg">
                     this appointment canceled
                  </p>
                ) : (
                  <button
                   onClick={() => cancelAppiontment(item._id)}
                   className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 p-6">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default AllApointment;
