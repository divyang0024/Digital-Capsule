import React from "react";
import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useSelector } from 'react-redux';




function CapsuleDetails() {
  const location = useLocation();
  const { capsuleData } = location.state || {};

  // const { user } = useSelector(state => state.user);
  // const dispatch=useDispatch();

  if (!capsuleData) {
    return <p>Capsule data not found.</p>;
  }

  const descriptionRef = useRef(null);
  const [isTypingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    if (descriptionRef.current && capsuleData?.description) {
      const textLength = descriptionRef.current.textContent.length || 0;
      descriptionRef.current.style.setProperty('--step-count', textLength);

      const typingDuration = 4000;
      const timeout = setTimeout(() => setTypingComplete(true), typingDuration);
      console.log("Capsule data iss",capsuleData);

      return () => clearTimeout(timeout); 
    }
  }, [capsuleData.description]);


  var images = ["https://content.r9cdn.net/rimg/dimg/db/02/06b291e8-city-14912-171317ad83a.jpg?width=1750&height=1000&xhint=3040&yhint=2553&crop=true","https://speakzeasy.files.wordpress.com/2015/05/twa_blogpic_timisoara-4415.jpg"]

  return (
 <div className="Capsule-detail-container py-10">
  <div className=" w-[35%] h-[3%] mx-auto text-black py-5 flex  items-center gap-3"> <span> <FaUser /> </span> <span> Username </span>  </div>
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
                <img src={image.url} alt={`Slide ${index + 1}`} width="300" height="300" />
              </div>
              {/* <div className="carousel-controls">
                <label
                  htmlFor={`img-${index === 0 ? images.length : index}`}
                  className="prev-slide"
                >
                  <span>&lsaquo;</span>
                </label>
                <label
                  htmlFor={`img-${(index + 1) % images.length + 1}`}
                  className="next-slide"
                >
                  <span>&rsaquo;</span>
                </label>
              </div> */}
            </li>
          </React.Fragment>
        ))}
        <div className="carousel-dots">
          {images.map((_, index) => (
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
      {/* <h1>{capsuleData.title}</h1> */}

      <div className="min-h-20 h-auto p-4 rounded-lg my-5 w-[100%] bg-white">
      <p
        className={`capsule-description ${
          isTypingComplete ? "cursor-none" : ""
        }`}
        ref={descriptionRef}
      >
        {capsuleData?.description || "Loading..."}
      </p>
    </div>
      
      {/* <p>{capsuleData.content}</p> */}
    </div>
  </div> 
  </div>
  );
}

export default CapsuleDetails;


{/* <div>
      <h1>{capsuleData.title}</h1>
      <p>{capsuleData.description}</p>
      <p>{capsuleData.content}</p>
      {capsuleData.media?.map((mediaItem, index) => (
        <img key={index} src={mediaItem.url} alt={`Media ${index}`} width="300" height="300" />
      ))}
    </div> */}