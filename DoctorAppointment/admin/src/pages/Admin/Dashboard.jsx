import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/Admincontest";

const Dashboard = () => {
  const { getDashData, dashData, aToken, cancelAppiontment } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    aToken && (
      <div className="p-6 mx-auto max-w-6xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Admin Dashboard
      </h2>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-semibold">Total Users</h3>
          <p className="text-4xl font-bold mt-2">{dashData?.totalUsers || 0}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-semibold">Total Doctors</h3>
          <p className="text-4xl font-bold mt-2">{dashData?.totalDoctors || 0}</p>
        </div>

        <div className="bg-red-500 text-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-semibold">Total Appointments</h3>
          <p className="text-4xl font-bold mt-2">{dashData?.totalAppointments || 0}</p>
        </div>
      </div>

      {/* Recent Appointments Section */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <h3 className="text-xl font-semibold bg-gray-100 p-4 text-gray-800 border-b">
          Recent Appointments
        </h3>

        {dashData?.latetest && dashData.latetest.length > 0 ? (
          <div>
            <div className="grid grid-cols-6 bg-gray-200 text-gray-800 font-semibold p-4 border-b text-center">
              <p>#</p>
              <p>Patient</p>
              <p>Doctor</p>
              <p>Date & Time</p>
              <p>Status</p>
              <p>Action</p>
            </div>

            {dashData.latetest.map((item, index) => (
              <div
                key={item._id}
                className="grid grid-cols-6 items-center p-4 border-b odd:bg-white even:bg-gray-50 text-center"
              >
                <p className="text-gray-700 font-medium">{index + 1}</p>

                {/* Patient Info */}
                <div className="flex flex-col items-center">
                  <img
                    src={item.userData.image}
                    alt={item.userData.name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <p className="text-gray-800 text-sm font-medium mt-1">{item.userData.name}</p>
                </div>

                {/* Doctor Info */}
                <div className="flex flex-col items-center">
                  <img
                    src={item.docData.image}
                    alt={item.docData.name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <p className="text-gray-800 text-sm font-medium mt-1">{item.docData.name}</p>
                  <p className="text-xs text-gray-500">{item.docData.speciality}</p>
                </div>

                {/* Date & Time */}
                <p className="text-gray-700 font-semibold">
                  {item.slotDate} <br />
                  <span className="text-sm text-gray-500">{item.slotTime}</span>
                </p>

                {/* Status */}
                <p
                  className={`font-semibold ${
                    item.cancelled ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {item.cancelled ? "Cancelled" : "Active"}
                </p>

                {/* Cancel Button */}
                <div>
                  {item.cancelled ? (
                    <span className="text-gray-500 italic">Already Cancelled</span>
                  ) : (
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      onClick={() => cancelAppiontment(item._id)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 p-6">No recent appointments found.</p>
        )}
      </div>
    </div>
    )
  );
};

export default Dashboard;
