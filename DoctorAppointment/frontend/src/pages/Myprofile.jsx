import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Harshit Nehra",
    image: assets.profile_pic,
    email: "abc@gmail.com",
    phone: "1234567890",
    address: {
      line1: "123 Main St",
      line2: "Apt 4",
    },
    gender: "Male",
    dob: "2001-07-20",
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleSave = () => {
    setIsEdit(false);
    console.log("User Data Saved:", userData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center">
        <img
          src={userData.image}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />

        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="mt-2 border p-2 rounded-md w-full"
          />
        ) : (
          <p className="text-xl font-semibold mt-2">{userData.name}</p>
        )}
      </div>

      <hr className="my-4" />

      <div>
        <p className="text-lg font-semibold mb-2">Contact Information</p>
        <div className="mb-2">
          <p className="font-medium">Email:</p>
          <p className="text-gray-600">{userData.email}</p>
        </div>
        <div className="mb-2">
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="border p-2 rounded-md w-full"
            />
          ) : (
            <p className="text-gray-600">{userData.phone}</p>
          )}
        </div>
      </div>

      <hr className="my-4" />

      <div>
        <p className="text-lg font-semibold mb-2">Address</p>

        {isEdit ? (
          <>
            <input
              type="text"
              value={userData.address.line1}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))
              }
              className="border p-2 rounded-md w-full mb-2"
            />
            <input
              type="text"
              value={userData.address.line2}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value },
                }))
              }
              className="border p-2 rounded-md w-full"
            />
          </>
        ) : (
          <>
            <p className="text-gray-600">{userData.address.line1}</p>
            <p className="text-gray-600">{userData.address.line2}</p>
          </>
        )}
      </div>

      <hr className="my-4" />

      <div>
        <p className="text-lg font-semibold">Gender:</p>
        {isEdit ? (
          <select
            value={userData.gender}
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
          <p className="text-gray-600">{userData.gender}</p>
        )}
      </div>

      <div className="mt-3">
        <p className="text-lg font-semibold">Date of Birth:</p>
        {isEdit ? (
          <input
            type="date"
            value={userData.dob}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, dob: e.target.value }))
            }
            className="border p-2 rounded-md w-full"
          />
        ) : (
          <p className="text-gray-600">{userData.dob}</p>
        )}
      </div>

      <button
        onClick={isEdit ? handleSave : () => setIsEdit(true)}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {isEdit ? "Save" : "Edit Profile"}
      </button>
    </div>
  );
};

export default MyProfile;
