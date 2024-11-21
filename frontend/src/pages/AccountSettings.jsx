import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions.js';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import '../styles/Dashboard.css';
import { useSelector } from 'react-redux';
import { IoLogOut } from "react-icons/io5";
import { BsCapsule } from "react-icons/bs";
import { SiPrivateinternetaccess } from "react-icons/si";
import { IoEarthSharp } from "react-icons/io5";
import { GiCampCookingPot } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import Mycapsule from './Mycapsule';
import Privatecapsule from './Privatecapsule';
import PublicCapsule from './PublicCapsule';
import Brewcapule from './Brewcapule';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userImg from '../assets/user.png';
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";



function AccountSettings() {
  const [currentContent, setCurrentContent] = useState('mycapsules');
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    const handleBackButton = (event) => {
      window.history.pushState(null, document.title, window.location.href);
    };
    window.addEventListener('popstate', handleBackButton);
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  const renderContent = () => {
    switch (currentContent) {
      case 'mycapsules':
        return <Mycapsule />;
      case 'privatecapsules':
        return <Privatecapsule />;
      case 'publiccapsules':
        return <PublicCapsule />;
      case 'brewcapsules':
        return <Brewcapule />;
      default:
        return <Mycapsule />;
    }
  };

  const toggleContent = (id) => {
    setCurrentContent(id);
  };

  const handleLogout = () => {
    toast.success('Logout Successful! Redirecting...');
    setTimeout(() => {
      dispatch(logoutUser());
    }, 3000);
  }

  return (
    <div className='main-container flex justify-between'>
      <div className='sidebar-container'>
        <Link to="/" className='absolute top-2 left-4 text-[#283149] w-36 h-36'>
           <FaArrowLeft />
          {/* <img src={leftArrow} alt="home icon" width="35" height="35" /> */}
        </Link>
        <h1 className="header-container text-[#283149]">Yaadgaar</h1>
        <div className='profile-container cursor-pointer pb-2 border-b-2 border-[#283149]'>
          {/* <FaUserCircle className='user-icon' /> */}
          <img src={userImg} />
          <h1 className='username-name'>{user.user.username}</h1>
          <h1 className='username-email text-md font-semibold'>{user.user.email}</h1>
        </div>

        <div className="logout-container">
          <IoLogOut className='logout-icon text-[#283149]' />
          <button onClick={handleLogout} className="text-[#283149]" >Logout</button>
        </div>
      </div>

      <div className="h-100 w-100 account-settings mx-auto " >



        <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg mt-10 shadow-lg shadow-[#7f84cd] border-2 border-grey">
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
            <button className="w-full bg-[#283149] text-white py-3 rounded-lg hover:bg-[#171e31]">
              Save Changes
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}


export default AccountSettings;




