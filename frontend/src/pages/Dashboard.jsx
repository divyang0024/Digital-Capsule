import React, { useState,useEffect } from 'react';
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

function Dashboard() {
  const [currentContent, setCurrentContent] = useState('mycapsules');
  const { user } = useSelector(state => state.user);
  const dispatch=useDispatch();

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

  const handleLogout=()=>{
   dispatch(logoutUser());
  }

  return (
    <div className='main-container'>
      <div className='sidebar-container'>
        <h1 className="header-container">Yaadgar</h1>
        <div className='profile-container'>
          <FaUserCircle className='user-icon' />
          <h1 className='username-name'>{user.user.username}</h1>
          <h1 className='username-email'>{user.user.email}</h1>
        </div>
        <div className='togglebar-container'>

          <div className={currentContent=='mycapsules'?"toggle-button-contianer":"flex gap-2 items-center text-sm text-black"} onClick={() => toggleContent('mycapsules')}>
            <BsCapsule className={currentContent=='mycapsules'?"togglebar-icons text-[#CDFAD5] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]":"text-xl "} />
            <button className="toggle-button">My capsules</button>
          </div>
          <div className={currentContent=='privatecapsules'?"toggle-button-contianer":"flex gap-2 items-center text-sm text-black"} onClick={() => toggleContent('privatecapsules')}>
            <SiPrivateinternetaccess className={currentContent=='privatecapsules'?"togglebar-icons text-[#F6FDC3] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]":"text-xl text-[CDFAD5] "} />
            <button className="toggle-button">Private capsules</button>
          </div>
          <div className={currentContent=='publiccapsules'?"toggle-button-contianer":"flex gap-2 items-center text-sm text-black"} onClick={() => toggleContent('publiccapsules')}>
            <IoEarthSharp className={currentContent=='publiccapsules'?"togglebar-icons text-[#FFFFFF] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]":"text-xl text-[CDFAD5]"} />
            <button className="toggle-button">Public capsules</button>
          </div>
          <div className={currentContent=='brewcapsules'?"toggle-button-contianer":"flex gap-2 items-center text-sm text-black"} onClick={() => toggleContent('brewcapsules')}>
            <GiCampCookingPot className={currentContent=='brewcapsules'?"togglebar-icons text-[#FF8080] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]":"text-xl text-[CDFAD5]"} />
            <button className="toggle-button">Brew capsule</button>
          </div>
        </div>
        <div className="logout-container">
          <IoLogOut className='logout-icon' />
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className='content-container'>
      <div className='panel-menu-container'>
      <div className='panel-container'>
      Howdy there! {user.user.name} 👋
      </div>
      <div>
      <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#FF8080] px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-[#FF8080]">
          Menu
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              Account settings
            </a>
          </MenuItem>
            <MenuItem>
              <button
                type="button"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
               onClick={handleLogout}  
              >
                Sign out
              </button>
            </MenuItem>
        </div>
      </MenuItems>
    </Menu>
      </div>
      </div>
        <div className='capsule-container'>
        {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
