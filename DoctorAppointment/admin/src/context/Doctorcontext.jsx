import { useState } from "react";
import { createContext } from "react";
import axios from "axios"
import { toast } from "react-toastify";

// Create Context
export const DoctorContext = createContext();

// Create Provider Component
const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dtoken, setDToken] = useState(localStorage.getItem("dtoken") ? localStorage.getItem("dtoken") : "")
  const [appointments , setappointments] = useState([]);
  const [ dashData, setdashData] = useState(false);
  const [docterData, setdocterData] = useState(false);

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, { headers: { dtoken } });
      if (data.success) {
        setappointments(data.appointments.reverse());
        // console.log( data.appointments.reverse()   );
        // toast.success("Appointments fetched successfully!");
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error("Error fetching appointments!");
    }
  }
  // complete appointment
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/doctor/complete-appointments`,{appointmentId}, { headers: { dtoken } });
      if (data.success) {
       fetchAppointments()
        toast.success("Appointment completed successfully!");
      } else{
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error completing appointment:', error);
      toast.error("Error completing appointment!");
    }
  }
  // cancelled-appointments
  const cancelledAppointments = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/doctor/cancelled-appointments`,{appointmentId}, { headers: { dtoken } });
      if (data.success) {
        fetchAppointments()
        toast.success("Cancelled appointments fetched successfully!");
      } else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error fetching cancelled appointments!");
    }
  }
  // get dashdoard data
  const dashboardData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, { headers: { dtoken } });
      if (data.success) {
        console.log(data.dashboard);
        setdashData(data.dashboard);
        // toast.success("Dashboard data fetched successfully!");
      } else{
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error("Error fetching dashboard data!");
    }
  }
  // get docter profile
  const getDoctorProfile = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, { headers: { dtoken } });
      if (data.success) {
        console.log(data.doctor);
        setdocterData(data.doctor);
        // toast.success("Doctor profile fetched successfully!");
      } else{
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching doctor profile:', error);
      toast.error("Error fetching doctor profile!");
    }
  }
  
    const value = {
      dtoken,
      setDToken,
      backendUrl,
      fetchAppointments,
      appointments,
      setappointments,
      completeAppointment,
      cancelledAppointments,
      dashboardData,
      dashData,
      setdashData,
      getDoctorProfile,
      setdocterData,
      docterData,
    }
  
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};



export default DoctorContextProvider;


// Logout function
// const logout = () => {
//   localStorage.removeItem("dtoken");
//   setDToken("");
// }