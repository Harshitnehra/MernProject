import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Docters from "./pages/Docters";
import Login from "./pages/Login";
import Myprofile from "./pages/Myprofile";
import Myappointments from "./pages/Myappointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from './components/Fotter';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
      <div className="mx-4 sm:mx-[10%]">
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/doctor" element={<Docters />} />
          <Route path="/doctor/:speciality" element={<Docters />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-profile" element={<Myprofile />} />
          <Route path="/my-appointments" element={<Myappointments />} />
          <Route path="/appointments/:docId" element={<Appointment />} />
        </Routes>
        <Footer/>
      </div>
  );
};

export default App;
