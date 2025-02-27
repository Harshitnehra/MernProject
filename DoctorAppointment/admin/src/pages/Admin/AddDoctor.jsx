import React, { useContext, useState } from "react";
import { assets } from "../../assets_admin/assets";
import { AdminContext } from "../../context/Admincontest";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [experience, setExperience] = useState("1 year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [degree, setDegree] = useState("");

  const specialties = [
    "Dermatologist",
    "Neurologist",
    "Pediatricians",
    "General Physician",
    "Gynecologist",
    "Gastroenterologist",
  ];
  const { aToken, backendUrl } = useContext(AdminContext);

  const onhandleSubmit = async (e) => {  // ✅ Add async
    e.preventDefault();
      
    try {
      if (!docImg) {
        return toast.error("Please select a doctor's image");
      }
      
      // Create a FormData object to handle file uploads
  
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("speciality", speciality);
      formData.append("experience", experience);
      formData.append("fee", Number(fees));
      formData.append("about", about);
      formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));
      formData.append("degree", degree);
  
      // Debugging: log formData
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
  
      // Add doctor to the database
      const { data } = await axios.post(backendUrl + "/api/admin/add-doctor", formData, {
        headers: { aToken }
      });
      if (data.success) {
        toast.success("Doctor added successfully!");  // Show success message
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        // setExperience("");
        setFees("");
        setAbout("");
        setAddress1("");
        setAddress2("");
        setDegree("");

      }else{
        toast.error("this user is all ready exist");  // Show error message
      }
  
    } catch (error) {
      console.error(error);
      toast.error("Failed to add doctor");
      
    }
  };
  

  return (
    <form
      onSubmit={onhandleSubmit}
      className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Doctor</h2>

      {/* Image Upload Section */}
      <div className="flex flex-col items-center mb-4">
        <label htmlFor="doc-img" className="cursor-pointer">
          <img
            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
            alt="Upload"
            className="w-32 h-32 object-cover rounded-full border border-gray-300"
          />
        </label>
        <input
          onChange={(e) => setDocImg(e.target.files[0])}
          type="file"
          id="doc-img"
          hidden
        />
        <p className="text-sm text-gray-500 mt-2">Upload Doctor's Picture</p>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Doctor Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-gray-700">Doctor Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-gray-700">Specialty</label>
          <select
            name="specialty"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            required
            className="input-field"
          >
            {specialties.map((spec, index) => (
              <option key={index} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Education</label>
          <input
            type="text"
            name="degree"
            placeholder="Education"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-gray-700">Experience (Years)</label>
          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700">About Doctor</label>
          <textarea
            name="about"
            placeholder="Write about the doctor"
            rows={3}
            cols={90}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
            className="input-field"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700">Consultation Fee ($)</label>
          <input
            type="number"
            name="fee"
            placeholder="Fee"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address1"
            placeholder="Address Line 1"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="text"
            name="address2"
            placeholder="Address Line 2"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            required
            className="input-field mt-2"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Add Doctor
      </button>
    </form>
  );
};

export default AddDoctor;


// Username  nehraharshit01

//  Password  0W9Qu253luipgEfV
