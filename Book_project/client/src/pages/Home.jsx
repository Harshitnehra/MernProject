import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
const Home = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <h1 className='mg-5 my-3'>Latest post</h1>
          <div className="card">
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Sample Blog"
            />
            <div className="card-body">
              <h5 className="card-title">Sample Blog Title</h5>
              <h2 className='card-title'>demo</h2>
              <p className="card-text">
                demo contant
              </p>
              <NavLink to="/blog/1" className="btn btn-primary">read more</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
