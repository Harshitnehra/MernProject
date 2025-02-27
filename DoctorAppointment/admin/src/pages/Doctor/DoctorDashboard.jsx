import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/Doctorcontext";

const DoctorDashboard = () => {
  const { dtoken, dashboardData, dashData } = useContext(DoctorContext);

  useEffect(() => {
    if (dtoken) {
      dashboardData();
    }
  }, [dtoken]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Doctor Dashboard
      </h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Appointments Count */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-blue-700">Total Appointments</h2>
          <p className="text-2xl font-bold mt-2">{dashData?.appointments || 0}</p>
        </div>

        {/* Earnings */}
        <div className="bg-green-100 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-green-700">Total Earnings</h2>
          <p className="text-2xl font-bold mt-2">${dashData?.earnings || 0}</p>
        </div>

        {/* Unique Patients */}
        <div className="bg-purple-100 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-purple-700">Unique Patients</h2>
          <p className="text-2xl font-bold mt-2">{dashData?.patients || 0}</p>
        </div>
      </div>

      {/* Latest Appointments Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Latest Appointments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr className="text-sm font-semibold">
                <th className="p-3">#</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {dashData?.latestAppointments?.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-gray-600 p-4">
                    No Recent Appointments
                  </td>
                </tr>
              ) : (
                dashData?.latestAppointments?.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b text-gray-700 hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={item.userData?.image || "https://via.placeholder.com/40"}
                        alt="User"
                        className="w-10 h-10 rounded-full border"
                      />
                      <p className="font-medium">{item.userData?.name || "N/A"}</p>
                    </td>
                    <td className="p-3">{item.userData?.phone || "N/A"}</td>
                    <td className="p-3">{item.userData?.gender || "N/A"}</td>
                    <td className="p-3">
                      {item.slotDate} at {item.slotTime}
                    </td>
                    <td className="p-3 font-semibold text-gray-800">${item.amount}</td>
                    <td className="p-3">
                      {item.isCompleted ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          Completed
                        </span>
                      ) : item.cancelled ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                          Cancelled
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
