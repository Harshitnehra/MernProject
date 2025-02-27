import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [appointment, setappointmentData] = useState([]);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });

      console.log(data.appointmentData);
      if (data.success && Array.isArray(data.appointmentData)) {
        setappointmentData(data.appointmentData);
        console.log(data.appointmentData);
        
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Error fetching appointments");
    }
  };
  const cancelAppiontment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        {
          headers: { token },
        }
      );
      if (data.success) {
        toast.success("Appointment canceled successfully!");
        getUserAppointments();
      } else {
        toast.error("Error canceling appointment");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Error fetching appointments");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">My Appointments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointment.map((item, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <img
                src={item.docData.image}
                alt={item.docData.name || "Doctor"}
                className="w-20 h-20 object-cover rounded-full border"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.docData.name}</h2>
                <p className="text-gray-600">{item.docData.speciality}</p>
                <p className="text-gray-500">
                  <strong>Address:</strong> {item.docData.address.line1},{" "}
                  {item.docData.address.line2}
                </p>
                <p className="text-gray-700 mt-2">
                  <span className="font-semibold">Date & Time:</span>{" "}
                  {item.slotDate} - {item.slotTime}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              {
                !item.cancelled &&
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                Pay Online
              </button>
              }
              {
                !item.cancelled &&
                <button
                onClick={() => cancelAppiontment(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Cancel Appointment
              </button>
              }
              {
                item.cancelled &&
                <p
                className="text-red-500 font-bold"
              >
                 Appointment cancel
              </p>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
