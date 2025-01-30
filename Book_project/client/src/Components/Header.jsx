import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate(); // Move useNavigate inside the component
  const usertoken = localStorage.getItem("token");
  const username = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login"); // Use navigate here
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Harshit Blog App
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-blog">
                Add Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-category">
                Add Category
              </NavLink>
            </li>
          </ul>
          <form className="d-flex">
            {usertoken && usertoken !== "null" ? (
              <>
                <button className="btn btn-primary">Welcome: {username}</button>
                <button className="btn btn-primary" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink className="btn btn-outline-success me-2" to="/login">
                  Login
                </NavLink>
                <NavLink className="btn btn-outline-primary" to="/register">
                  Register
                </NavLink>
              </>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
