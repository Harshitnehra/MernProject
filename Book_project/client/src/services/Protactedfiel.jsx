    import React from "react";
    import { Navigate, Outlet } from "react-router-dom";

    const PrivateRoute = () => {
    const usertoken = localStorage.getItem("token");

    return usertoken ? <Outlet /> : <Navigate to="/login" />;
    };

    export default PrivateRoute;
  