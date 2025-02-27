import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/Doctorcontext";
import { AdminContext } from "../../context/Admincontest";

const DoctorProfile = () => {
  const { dtoken, getDoctorProfile, docterData, } =
    useContext(DoctorContext);
  // const {changeavailable}= useContext(AdminContext)

  useEffect(() => {
    if (dtoken) {
      getDoctorProfile();
    }
  }, [dtoken]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Doctor Profile
      </h1>

      {docterData ? (
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
          {/* Profile Image */}
          <img
            src={docterData.image || "https://via.placeholder.com/150"}
            alt="Doctor"
            className="w-40 h-40 rounded-full border-2 border-gray-300 object-cover"
          />

          {/* Doctor Details */}
          <div className="md:ml-6 mt-4 md:mt-0 text-gray-700 w-full">
            <h2 className="text-2xl font-bold">{docterData.name}</h2>
            <p className="text-lg text-blue-600">{docterData.speciality}</p>
            <p className="text-md text-gray-600">{docterData.degree}</p>
            <p className="text-md text-gray-700 font-semibold mt-2">
              Experience: {docterData.experience}
            </p>

            {/* Contact Details */}
            <p className="mt-3 text-gray-600">
              <strong>Email:</strong> {docterData.email}
            </p>
            <p className="text-gray-600">
              <strong>Consultation Fee:</strong> ${docterData.fee}
            </p>

            {/* Address */}
            <div className="mt-3">
              <p className="text-gray-600">
                <strong>Address:</strong> {docterData.address?.line1},{" "}
                {docterData.address?.line2}
              </p>
            </div>

            {/* Availability Status */}
            <p
              className={`mt-3 font-semibold ${
                docterData.available ? "text-green-600" : "text-red-600"
              }`}
            >
              {docterData.available
                ? "Available for Appointments"
                : "Not Available"}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading Doctor Profile...</p>
      )}
    </div>
  );
};

export default DoctorProfile;
