import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";

// Create the context
export const AppContext = createContext();

// Define the context provider
const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);

  const getDoctorData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        // toast.error("Failed to fetch doctors. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      // toast.error("Failed to fetch doctors. Please try again later.");
    }
  };

  const loadUserProfileDate = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/get-profile",
        {
          headers: { token },
        }
      );
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error("Failed to fetch user's data. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user's data. Please try again later.");
    }
  };

  // Fetch doctor data on component mount
  const value = {
    getDoctorData,
    doctors,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileDate,
  };
  useEffect(() => {
    if (token) {
      loadUserProfileDate();
    } else {
      setUserData(false);
    }
  }, [token]);

  useEffect(() => {
    getDoctorData();
  }, [doctors]);

  return (
    // Provide the context to children components
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
