import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/Admincontest";
import { assets } from "../assets_admin/assets";
import { DoctorContext } from "../context/Doctorcontext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);

  return (
    <>
    {aToken && (
      <div className="w-64 h-screen bg-white shadow-md p-4">
        <h2 className="text-xl font-bold text-gray-700 mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition duration-300 ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <img src={assets.home_icon} alt="Dashboard Icon" className="w-6 h-6" />
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-appointments"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition duration-300 ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <img src={assets.appointment_icon} alt="Appointments Icon" className="w-6 h-6" />
              <p>All Appointments</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition duration-300 ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <img src={assets.add_icon} alt="Add Doctor Icon" className="w-6 h-6" />
              <p>Add Doctor</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctor-list"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition duration-300 ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <img src={assets.people_icon} alt="Doctors List Icon" className="w-6 h-6" />
              <p>Doctors List</p>
            </NavLink>
          </li>
        </ul>
      </div>
    )}{
      dtoken && (
        <div className="w-64 h-screen bg-white shadow-md p-4">
          <h2 className="text-xl font-bold text-gray-700 mb-6">Doctor Panel</h2>
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/doctor-dashboard"
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition duration-300 ${
                    isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
                  }`
                }
              >
                <img src={assets.home_icon} alt="Dashboard Icon" className="w-6 h-6" />
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/doctor-appointments "
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition duration-300 ${
                    isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
                  }`
                }
              >
                <img src={assets.appointment_icon} alt="Appointments Icon" className="w-6 h-6" />
                <p>Appointments</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/doctor-profile"
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition duration-300 ${
                    isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
                  }`
                }
              >
                <img src={assets.people_icon} alt="Doctors List Icon" className="w-6 h-6" />
                <p>Profile</p>
              </NavLink>
            </li>
          </ul>
        </div>
      )
    }
    </>
  );
};

export default Sidebar;
