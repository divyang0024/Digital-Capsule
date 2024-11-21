import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { brewCapsule, clearErrors } from '../actions/capsuleAction';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import leftArrow from "../assets/leftArrow.webp";

function EditCapsule() {

    const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  return (
    <>
    <div className=' h-screen w-100vw p-10 edit-capsule-container'>
        <Link to="/" className="absolute top-2 left-4">
            <img src={leftArrow} alt="home icon" width="35" height="35" />
         </Link>
      <div className="flex justify-center items-center  ">
        <form className="bg-white p-8 rounded-lg shadow-2xl shadow-white w-[50%] text-[#283149]">
          <div className="mb-4">
            {/* <label htmlFor="title" className="block font-medium mb-1">
              Title (Max 20 words):
            </label> */}
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Title (Max 20 words)'
              className="border rounded-md px-3 py-2 w-full input-box"
              required
            />
          </div>

          <div className="mb-4">
            {/* <label htmlFor="description" className="block font-medium mb-1">
              Description (Max 50 words):
            </label> */}
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Description (Max 50 words)'
              className="border rounded-md px-3 py-2 w-full input-box"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            {/* <label htmlFor="content" className="block font-medium mb-1">
              Content (Max 500 words):
            </label> */}
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder='Content (Max 500 words)'
              className="border rounded-md px-3 py-2 w-full input-box"
              required
            ></textarea>
          </div>

          <div className="flex justify-center my-5">
            <button type="submit" className="bg-[#283149] text-white border-2 border-white  hover:bg-white hover:text-[#283149] hover:border-2 hover:border-[#283149]  
          font-bold py-2 px-4 rounded">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
      </div>
    </>
  );
}

export default EditCapsule;
