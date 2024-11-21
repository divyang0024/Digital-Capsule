import React from "react";
import bg from '../assets/bgimage.jpg';
import { Link } from 'react-router-dom';
import leftArrow from '../assets/leftArrow.webp';

const AccountSettings = () => {
  return (
    <div className="h-100 w-100 account-settings m-0" style={{ backgroundImage: `url(${bg})` }}>
      <Link to="/" className='absolute top-2 left-4'>
        <img src={leftArrow} alt="home icon" width="35" height="35" />
      </Link>
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg mt-10 shadow-lg shadow-[#7f84cd]">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">Account Settings</h1>

        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Upload/Change Picture
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-600">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder="Username"
              className="border rounded-lg p-2 w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="border rounded-lg p-2 w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="border rounded-lg p-2 w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              className="border rounded-lg p-2 w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-600">About</h2>
            <textarea
              placeholder="Bio"
              className="border rounded-lg p-2 w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <input
              type="text"
              placeholder="Description"
              className="border rounded-lg p-2 w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-600">Change Password</h2>
            <input
              type="password"
              placeholder="Current Password"
              className="border rounded-lg p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="New Password"
              className="border rounded-lg p-2 w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="border rounded-lg p-2 w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
