import React, { useContext, useState } from "react";
import { AdminContext } from "../context/Admincontest"; // ✅ Correct import
import axios from "axios";
import { toast } from "react-toastify";
import {DoctorContext} from "../context/Doctorcontext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAtoken, backendUrl } = useContext(AdminContext); // ✅ Correct useContext
  const { setDToken} = useContext(DoctorContext); // ✅ Correct useContext

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", { email, password });
        if (data.success) {
          localStorage.setItem("aToken", data.token)
          setAtoken(data.token); 
          // console.log("Token:", data.token);
          toast.success("Login Successful!");
        }else{
          toast.error(data.message);
        }
      }else{
        const { data } = await axios.post(backendUrl + "/api/doctor/login", { email, password });
        if (data.success) {
          localStorage.setItem("dtoken", data.token)
          setDToken(data.token); 
          console.log("Token:", data.token);
          toast.success("Login Successful!");
        }else{
          toast.error(data.message);
        }
        // setDToken(data.token); // Set Doctor's JWT token in context
        // toast.success("Login Successful!"); // Show success message
      }
    } catch (error) {
     
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <p className="text-xl font-semibold text-center mb-4">
          <span className="text-blue-600">{state}</span> Login
        </p>

        <div className="mb-4">
          <p className="text-gray-600 mb-1">Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <p className="text-gray-600 mb-1">Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>

        {state === "Admin" ? (
          <p className="text-gray-600 text-center mt-4">
            Doctor login?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setState("Doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-gray-600 text-center mt-4">
            Admin login?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
