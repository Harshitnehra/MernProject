import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const daysofweeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const docData = doctors.find((doc) => doc._id === docId);
    if (docData) {
      setDocInfo(docData);
    }
  }, [docId, doctors]);

  useEffect(() => {
    if (!docInfo) return;

    const generateSlots = () => {
      let today = new Date();
      let slotsArray = [];

      for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        let endTime = new Date(currentDate);
        endTime.setHours(21, 0, 0, 0);

        if (today.getDate() === currentDate.getDate()) {
          currentDate.setHours(
            currentDate.getHours() >= 10 ? currentDate.getHours() + 1 : 10
          );
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
        } else {
          currentDate.setHours(10, 0, 0, 0);
        }

        let timeSlots = [];
        while (currentDate < endTime) {
          let formattedTime = currentDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
          currentDate.setMinutes(currentDate.getMinutes() + 30);
        }

        slotsArray.push(timeSlots);
      }

      setDocSlots(slotsArray);
    };

    generateSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row bg-white shadow-lg p-6 rounded-lg">
          <img
            src={docInfo.image}
            alt="Doctor"
            className="w-48 h-48 object-cover rounded-lg"
          />
          <div className="ml-6">
            <p className="text-2xl font-semibold flex items-center">
              {docInfo.name}
              <img
                src={assets.verified_icon}
                alt="Verified"
                className="ml-2 w-5 h-5"
              />
            </p>
            <p className="text-gray-600">
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <p className="mt-2 text-gray-500">
              Experience: {docInfo.experience} years
            </p>
            <p className="mt-4 font-semibold">About:</p>
            <p className="text-gray-700">{docInfo.about}</p>
            <p className="mt-4 text-lg font-semibold">
              Appointment Fee: {currencySymbol}
              {docInfo.fees}
            </p>
          </div>
        </div>

        {/* Booking slot */}
        <div className="mt-6">
          <p className="text-xl font-semibold">Booking Slots</p>
          <div className="flex space-x-4 mt-3">
            {docSlots.length > 0 &&
              docSlots.map((daySlots, index) => (
                <div
                  key={index}
                  className={`cursor-pointer p-2 rounded-lg ${
                    slotIndex === index ? "bg-blue-500 text-white" : "bg-gray-100"
                  }`}
                  onClick={() => setSlotIndex(index)}
                >
                  <p className="text-lg font-medium">
                    {daysofweeks[daySlots[0]?.datetime.getDay()]}
                  </p>
                  <p>{daySlots[0]?.datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {docSlots.length > 0 &&
              docSlots[slotIndex].map((slot, index) => (
                <p
                  key={index}
                  className={`cursor-pointer p-2 rounded-lg ${
                    slotTime === slot.time ? "bg-green-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setSlotTime(slot.time)}
                >
                  {slot.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
            Book an Appointment
          </button>
        </div>

        {/* List of Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
