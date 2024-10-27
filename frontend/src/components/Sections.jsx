import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import temp from '../assets/temp.webp';
import temp2 from '../assets/temp2.webp';
import temp3 from '../assets/temp3.webp';
import friends1 from '../assets/friends1.webp';
import friends2 from '../assets/friends2.webp';
import friends3 from '../assets/friends3.webp';
import section2bg from '../assets/section2_bg.webp';

const Sections = () => {

  const allSections = ["section1", "section2", "section3", "section4"]; 
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const updatedVisibility = { ...visibleSections };
  
      allSections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const { top, bottom } = section.getBoundingClientRect();
          const screenHeight = window.innerHeight;
  
          // Ensure section is fully in view
          if (top < screenHeight && bottom > 0) {
            updatedVisibility[sectionId] = true;
          } else {
            updatedVisibility[sectionId] = false;
          }
        }
      });
  
      setVisibleSections(updatedVisibility);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleSections]);
  
  return (
    <div className=''>
      <div id="section1" className={`section mt-[10vh] py-[2%] px-[6%] ${visibleSections["section1"] ? "visible" : ""}`} >

        <div className={`w-[50%] h-[100%] p-[3%] text-[#283149] leading-3 `}>
          <h1 className='text-3xl font-semibold mb-[5%] '> Create your capsule now! </h1>

          <ul className={`font-semibold text-xl p-[2%] list-disc  `}>
            <li style={visibleSections["section1"] ? { animation: "fade-in 1s ease 1s forwards" } : {}} className={` transform -translate-x-[130%] mb-[6%] `} >Craft a message, upload a photo, or record a thought for the future.</li>
            <li style={visibleSections["section1"] ? { animation: "fade-in 1s ease 2s forwards" } : {}} className={` transform -translate-x-[130%]  mb-[6%]`} >Select a special date for your friends to unlock the capsule.</li>
            <li style={visibleSections["section1"] ? { animation: "fade-in 1s ease 3s forwards" } : {}} className={` transform -translate-x-[130%]  mb-[6%]`} >It could be for a birthday, an anniversary, a future surprise, or even a note to your future self.</li>
            <li style={visibleSections["section1"] ? { animation: "fade-in 1s ease 4s forwards" } : {}} className={` transform -translate-x-[130%]  mb-[6%]`} >Send invitations to your friends to receive the capsule.</li>
          </ul>
        </div>

        <div className="w-[48%] h-[100%] py-[2%] px-[4%]" >
          <img src={temp} width="300" height="300" className={`relative img1 ${visibleSections["section1"] ? "rotate-0" : ""}  `} />
          <img src={temp3} width="300" height="300" className={`relative img2 ${visibleSections["section1"] ? "rotate-0" : ""} `} />
          <img src={temp2} width="300" height="300" className={`relative img3 ${visibleSections["section1"] ? "rotate-0" : ""} `} />
        </div>

      </div>

      <div id="section2" className={`section ${visibleSections["section2"] ? "visible" : ""}`} >

        <div className="w-[50vw] h-[100vh]" >
          <img src={section2bg} className={`section2img w-[100%] h-[100vh]`} />
        </div>

        <div className={`w-[50%] p-[3%] text-[#283149] leading-3 flex flex-col justify-center h-[100%] `}>
          <h1 className='text-3xl font-semibold mb-[5%] '> Why Create a Digital Capsule? </h1>

          <ul className={`font-semibold text-xl p-[2%] list-none `}>
            <li style={visibleSections["section2"] ? { animation: "dissolve-text 2s ease 1s forwards" } : {}} className={`opacity-0 mb-[6%] `} >Capture moments today to relive them tomorrow. </li>
            <li style={visibleSections["section2"] ? { animation: "dissolve-text 2s ease 2s forwards" } : {}} className={`opacity-0 mb-[6%]`} >See how far you've come and celebrate your journey</li>
            <li style={visibleSections["section2"] ? { animation: "dissolve-text 2s ease 3s forwards" } : {}} className={`opacity-0  mb-[6%]`} >Store thoughts, goals, and dreams for future reflection.</li>
            <li style={visibleSections["section2"] ? { animation: "dissolve-text 2s ease 4s forwards" } : {}} className={`opacity-0  mb-[6%]`} >A space to jot down inspiration, ideas, and aspirations.</li>
          </ul>

        </div>
      </div>


      <div id="section3" className={` section mt-[10vh] text-2xl font-semibold flex flex-col items-center gap-10 text-[#283149] ${visibleSections["section3"] ? "visible" : ""}`} >

        <h1 className='text-4xl'>We warmly welcome you with a heartfelt hug</h1>
        <h2>Go ahead and create your first time caspule!</h2>
        <button className='text-white  bg-[#FF6B6B] mt-10 py-2 px-4 text-lg transition duration-300 hover:text-[#FF6B6B] hover:bg-white'>+ New Capsule</button>
      </div>

      <div id="section4" className={`section mt-[-20%] ${visibleSections["section4"] ? "visible" : ""}`} >

      <div className="w-[50%] h-[100%]" id="friends" >
          <img src={friends1} style={visibleSections["section4"] ? { animation: "rotatingImage 1s ease 1s forwards" } : {}}  className={`transform -translate-x-[250%] rotate-180 rounded-full w-1/3 h-1/3 object-cover relative left-[45%] top-16 `} />
          <img src={friends2} style={visibleSections["section4"] ? { animation: "rotatingImage 1s ease 1s forwards" } : {}}  className={`transform -translate-x-[250%] rotate-180 rounded-full w-1/3 h-1/3 object-cover relative left-20 `} />
          <img src={friends3} style={visibleSections["section4"] ? { animation: "rotatingImage 1s ease 1s forwards" } : {}}  className={`transform -translate-x-[250%] rotate-180 rounded-full w-1/3 h-1/3 object-cover relative left-[45%] -top-16`}  />
        </div>

        <div className={`w-[50%] leading-3 flex flex-col justify-center h-[100%] px-[4%]`}>
          
            <h1 className='text-2xl font-medium text-[#283149]'>Share the joy—invite your friends and craft lasting memories together ! </h1>
            <button className='text-white  bg-[#FF6B6B] mt-10 py-2 px-4 text-lg transition duration-300 hover:text-[#FF6B6B] hover:bg-white'>+ Invite Friends</button>

        </div>
        
      </div>


       
    </div>
  );
};


export default Sections;

