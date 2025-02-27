// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter
import "./index.css";
import App from "./App.jsx";
import DoctorContextProvider from "./context/Doctorcontext.jsx";
// import AppContextProvider from "./context/Appcontext.jsx";
import AdminContextProvider from "./context/Admincontest.jsx";

createRoot(document.getElementById("root")).render(
  <AdminContextProvider>
    
      <DoctorContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DoctorContextProvider>
    
  </AdminContextProvider>
);
