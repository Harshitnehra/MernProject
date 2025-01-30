import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addcategory = () => {
  const [input, setInput] = useState({
    title: "",
  });
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/add/category",
        input,{
            headers:{
                authorization : `Bearer ${localStorage.getItem("token")}`
            },
          }
      );
      alert(res.data.message);
      
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={input.title}
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
            placeholder="Enter blog title"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add category
        </button>
      </form>
    </div>
  );
};

export default Addcategory;
