import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Contact = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-3xl font-semibold text-gray-800">
          Contact <span className="text-blue-600">Us</span>
        </p>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-6">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img
            src={assets.contact_image}
            alt="Contact"
            className="w-72 h-72 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Contact Details */}
        <div className="w-full md:w-1/2 text-gray-700">
          <p className="text-lg font-medium">We are here to help you. Please reach out to us at any time.</p>
          <div className="mt-4 space-y-2">
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> info@doctorappointment.com
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Phone:</span> +1-123-456-7890
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Address:</span> 123 Main St, City, State, ZIP
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Hours:</span> Mon-Fri 9:00 AM - 5:00 PM
            </p>
            <p className="text-red-500 font-semibold">Closed on Saturdays and Sundays</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
