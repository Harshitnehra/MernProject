import { createContext, useState } from "react";
import axiox from "axios";
import { toast } from "react-toastify";

// Create Context
export const AdminContext = createContext(); // ✅ Export the context

// Create Provider Component
const AdminContextProvider = (props) => {
  // ✅ Destructure children
  const [aToken, setAtoken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setappointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axiox.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
        // console.log(data.doctors);
      } else {
        toast.error(data.massage);
      }
    } catch (error) {
      toast.error(error.massage);
    }
  };

  const changeavailable = async (docId) => {
    try {
      const { data } = await axiox.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success("Availability status changed!");
        getAllDoctors();
      } else {
        toast.error(data.massage);
      }
    } catch (error) {
      toast.error(error.massage);
    }
  };
  const cancelAppiontment = async (appointmentId) => {
    try {
      const { data } = await axiox.post(
        `${backendUrl}/api/admin/change-appointment`,
        { appointmentId },
        {
          headers: { aToken },
        }
      );
      if (data.success) {
        toast.success("Appointment canceled successfully!");
        getAllappointment();
      } else {
        toast.error("Error canceling appointment");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Error fetching appointments");
    }
  };

  const getAllappointment = async () => {
    try {
      const { data } = await axiox.get(backendUrl + "/api/admin/appointment", {
        headers: { aToken },
      });
      if (data.success) {
        setappointments(data.appointments);
        // console.log(data.appointments);
      }
    } catch (error) {
      toast.error(error.massage);
    }
  };
  const getDashData = async () => {
    try {
      const { data } = await axiox.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken },
      });
      if (data.success) {
        setDashData(data.dashData);
        // console.log(data.dashData);
      }
    } catch (error) {
      toast.error(error.massage);
    }
  }


  // Add other functions to the context
  const value = {
    aToken,
    setAtoken,
    backendUrl,
    getAllDoctors,
    doctors,
    changeavailable,
    appointments,
    getAllappointment,
    setappointments,
    cancelAppiontment,
    getDashData,
    dashData,
    setDashData,
    // Add other context variables and functions here
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
