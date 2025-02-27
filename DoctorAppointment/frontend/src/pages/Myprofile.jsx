import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify"; // Ensure this is imported

const MyProfile = () => {
  const { userData, setUserData, loadUserProfileDate, token, backendUrl } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateUserProfileDate = async () => {
    try {
      const formData = new FormData();
      if (image) formData.append("image", image);
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);

      const { data } = await axios.put(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Profile updated successfully!");
        setIsEdit(false);
        await loadUserProfileDate(); // Refresh user data
        setImage(false);
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    userData && (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col items-center">
          {isEdit ? (
            <label htmlFor="image" className="cursor-pointer">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-gray-300 hover:border-blue-500 transition">
                <img
                  src={image ? URL.createObjectURL(image) : userData?.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                  <img
                    src={assets.upload_icon}
                    alt="Upload Icon"
                    className="w-10 h-10"
                  />
                </div>
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img
              src={userData?.image}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-gray-300"
            />
          )}

          {isEdit ? (
            <input
              type="text"
              value={userData?.name || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="mt-2 border p-2 rounded-md w-full"
            />
          ) : (
            <p className="text-xl font-semibold mt-2">{userData?.name}</p>
          )}
        </div>

        <hr className="my-4" />

        <div>
          <p className="text-lg font-semibold mb-2">Contact Information</p>
          <div className="mb-2">
            <p className="font-medium">Email:</p>
            <p className="text-gray-600">{userData?.email}</p>
          </div>
          <hr />
          <div className="mb-2">
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData?.phone || ""}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="border p-2 rounded-md w-full"
              />
            ) : (
              <p className="text-gray-600">{userData?.phone}</p>
            )}
          </div>
        </div>
        <div>
          <p className="text-lg font-semibold">Gender:</p>
          {isEdit ? (
            <select
              value={userData?.gender || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              className="border p-2 rounded-md w-full"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="text-gray-600">{userData?.gender}</p>
          )}
        </div>

        <div className="mt-3">
          <p className="text-lg font-semibold">Date of Birth:</p>
          {isEdit ? (
            <input
              type="date"
              value={userData?.dob || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              className="border p-2 rounded-md w-full"
            />
          ) : (
            <p className="text-gray-600">{userData?.dob}</p>
          )}
        </div>

        <button
          onClick={isEdit ? updateUserProfileDate : () => setIsEdit(true)}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {isEdit ? "Save" : "Edit Profile"}
        </button>
      </div>
    )
  );
};

export default MyProfile;
