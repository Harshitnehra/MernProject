import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addblog = () => {
  const [input, setInput] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [category, setCategory] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Fetch categories from backend
  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/get/category", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCategory(res.data.fetchAllCategory || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchAllCategory();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("category", input.category);
    formData.append("description", input.description);
    formData.append("thumbnail", file); // Append file

    try {
      const res = await axios.post("http://localhost:5000/api/v1/get/blog", formData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert(res.data.message);
      navigate("/");
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={input.title}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={input.category}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            required
          >
            <option value="">Select a category</option>
            {category.length > 0 ? (
              category.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))
            ) : (
              <option disabled>No categories found</option>
            )}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="4"
            name="description"
            value={input.description}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            placeholder="Write your blog description here"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
          <input
            type="file"
            className="form-control"
            id="thumbnail"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Add blog</button>
      </form>
    </div>
  );
};

export default Addblog;
