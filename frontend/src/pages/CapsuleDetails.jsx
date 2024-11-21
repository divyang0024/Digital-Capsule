


import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import leftArrow from "../assets/leftArrow.webp";
import { IoIosArrowDropright } from "react-icons/io";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'


function CapsuleDetails() {
  const location = useLocation();
  const { capsuleData } = location.state || {};
  const descriptionRef = useRef(null);
  const [isTypingComplete, setTypingComplete] = useState(false);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    if (!capsuleData?.content || !descriptionRef.current) return;

    const text = capsuleData.content;
    const typingSpeed = 50; // Speed in milliseconds per character
    let currentText = "";
    let charIndex = 0;

    const typewriter = () => {
      if (charIndex < text.length) {
        currentText += text[charIndex];
        descriptionRef.current.textContent = currentText;
        charIndex++;
        setTimeout(typewriter, typingSpeed);
      } else {
        setTypingComplete(true); // Animation complete
      }
    };

    typewriter();
  }, [capsuleData?.content]);

  if (!capsuleData) {
    return <p>Capsule data not found.</p>;
  }

  const handleLogout = () => {
    toast.success('Logout Successful! Redirecting...');
    setTimeout(() => {
      dispatch(logoutUser());
    }, 3000);
  }

  return (
    <div className="Capsule-detail-container py-5 h-screen overflow-x-hidden">
      <div className="flex flex-row justify-between items-center px-8 mb-8">
        <div>
      <Link to="/" className="">
        <img src={leftArrow} alt="home icon" width="35" height="35" />
      </Link>
      </div>
      {/* <Sidebar/> */}
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset  bg-white ">
              <span className="text-[#283149]"> Menu </span>
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <Link
                  to="/account"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                >
                  Account settings
                </Link>
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

      <div className="border-y-2 border-white">
        <div className="w-[35%] h-[3%] mx-auto text-black py-5 flex items-center gap-3">
          <span>
            <FaUser />
          </span>
          <span> {user.user.name} </span>
        </div>
        <div className="detail-container flex flex-col w-[50%] ">
          <div className="carousel">
            <ul className="slides">
              {capsuleData.media.map((image, index) => (
                <React.Fragment key={index}>
                  <input
                    type="radio"
                    name="radio-buttons"
                    id={`img-${index + 1}`}
                    defaultChecked={index === 0}
                  />
                  <li className="slide-container">
                    <div className="w-[100%] h-[300px] slide-image flex items-center justify-center border-2 border-gray-200 p-5">
                      <img
                        src={image.url}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-contain justify-center items-center mx-auto"
                      />
                    </div>
                  </li>
                </React.Fragment>
              ))}
              <div className="carousel-dots">
                {capsuleData.media.map((_, index) => (
                  <label
                    htmlFor={`img-${index + 1}`}
                    className="carousel-dot"
                    key={`dot-${index}`}
                  ></label>
                ))}
              </div>
            </ul>
          </div>

          <div className="flex flex-col mx-auto w-[70%]">
  <div className="min-h-20 h-auto p-4 rounded-lg my-5 w-[100%] bg-white">
    <div className="font-semibold flex items-center gap-3 text-wrap">
      Tagline {<IoIosArrowDropright />} {capsuleData.title}
    </div>
    <p
      className={`capsule-description ${isTypingComplete ? "cursor-none" : ""} whitespace-normal`}
      ref={descriptionRef}
    >
      {/* Description text goes here */}
    </p>
  </div>
</div>

        </div>
      </div>
      <p className="text-[#283149] font-semibold text-3xl py-10 px-5">Yaadgaar</p>
    </div>
  );
}

export default CapsuleDetails;



