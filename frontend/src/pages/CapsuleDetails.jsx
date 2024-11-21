


import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import leftArrow from "../assets/leftArrow.webp";
import { IoIosArrowDropright } from "react-icons/io";
import { useSelector } from "react-redux";

function CapsuleDetails() {
  const location = useLocation();
  const { capsuleData } = location.state || {};
  const descriptionRef = useRef(null);
  const [isTypingComplete, setTypingComplete] = useState(false);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    if (!capsuleData?.description || !descriptionRef.current) return;

    const text = capsuleData.description;
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
  }, [capsuleData?.description]);

  if (!capsuleData) {
    return <p>Capsule data not found.</p>;
  }

  return (
    <div className="Capsule-detail-container py-10">
      <Link to="/" className="absolute top-2 left-4">
        <img src={leftArrow} alt="home icon" width="35" height="35" />
      </Link>
      <div className="w-[35%] h-[3%] mx-auto text-black py-5 flex items-center gap-3">
        <span>
          <FaUser />
        </span>
        <span> {user.user.name} </span>
      </div>
      <div className="detail-container flex flex-col w-[50%]">
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
                  <div className="slide-image">
                    <img
                      src={image.url}
                      alt={`Slide ${index + 1}`}
                      width="300"
                      height="300"
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
            <div className="font-semibold flex items-center gap-3">Tagline  {<IoIosArrowDropright />} {capsuleData.title}  </div>
            <p
              className={`capsule-description ${isTypingComplete ? "cursor-none" : ""
                }`}
              ref={descriptionRef}
            >
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CapsuleDetails;



