import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/Doctorcontext";

const DoctorAppointment = () => {
  const {
    dtoken,
    fetchAppointments,
    appointments,
    completeAppointment,
    cancelledAppointments,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (dtoken) {
      fetchAppointments();
    }
  }, [dtoken]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Doctor's Appointments
      </h1>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          {/* Table Header */}
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr className="text-sm font-semibold">
              <th className="p-3">#</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Amount</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-gray-600 p-4">
                  No Appointments Found
                </td>
              </tr>
            ) : (
              appointments.slice(0,5).reverse().map((item, index) => (
                <tr
                  key={index}
                  className="border-b text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="p-3">{index + 1}</td>

                  {/* Patient Info */}
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={
                        item.userData?.image || "https://via.placeholder.com/40"
                      }
                      alt="User"
                      className="w-10 h-10 rounded-full border"
                    />
                    <p className="font-medium">
                      {item.userData?.name || "N/A"}
                    </p>
                  </td>

                  {/* Payment Status */}
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.payment
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.payment ? "Paid" : "Unpaid"}
                    </span>
                  </td>

                  {/* Phone Number */}
                  <td className="p-3">{item.userData?.phone || "N/A"}</td>

                  {/* Gender */}
                  <td className="p-3">{item.userData?.gender || "N/A"}</td>

                  {/* Date & Time */}
                  <td className="p-3">
                    {item.slotDate} at {item.slotTime}
                  </td>

                  {/* Amount */}
                  <td className="p-3 font-semibold text-gray-800">
                    ${item.amount}
                  </td>

                  {/* Action Buttons */}
                  <td className="p-3 text-center space-x-2">
                    {/* Show "No Actions" if cancelled or completed */}
                    {item.cancelled ?  
                      <p className="text-red-500 font-medium">Cancelled</p>
                     : item.iscompleted ? 
                      <p className="text-green-500 font-medium">Completed</p>
                    : 
                      <>
                        {/* Show only if the appointment is NOT completed */}
                        <button
                          onClick={() => cancelledAppointments(item._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all shadow-sm"
                        >
                          Cancel
                        </button>
                        
                        <button
                          onClick={() => completeAppointment(item._id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all shadow-sm"
                        >
                          Complete
                        </button>
                      </>
                    }
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointment;
