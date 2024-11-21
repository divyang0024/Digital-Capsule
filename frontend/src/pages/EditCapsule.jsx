import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation } from 'react-router-dom';
import leftArrow from "../assets/leftArrow.webp";
import { updateCapsule } from '../actions/capsuleAction'; // Import your update action

function EditCapsule() {
  const location = useLocation();
  const { capsuleData } = location.state || {};

  // Ensure capsuleData is available before initializing the state
  const [title, setTitle] = useState(capsuleData?.title || '');
  const [description, setDescription] = useState(capsuleData?.description || '');
  const [content, setContent] = useState(capsuleData?.content || '');

  // Store the initial state to compare later
  const [initialState, setInitialState] = useState({
    title: capsuleData?.title || '',
    description: capsuleData?.description || '',
    content: capsuleData?.content || '',
  });

  const dispatch = useDispatch();

  // Update initialState if capsuleData changes
  useEffect(() => {
    if (capsuleData) {
      setInitialState({
        title: capsuleData.title,
        description: capsuleData.description,
        content: capsuleData.content,
      });
    }
  }, [capsuleData]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data word count
    if (title.split(' ').length > 20) {
      toast.error('Title exceeds 20 words limit!');
      return;
    }
    if (description.split(' ').length > 50) {
      toast.error('Description exceeds 50 words limit!');
      return;
    }
    if (content.split(' ').length > 500) {
      toast.error('Content exceeds 500 words limit!');
      return;
    }

    // Create updatedCapsule object only if fields are modified
    const updatedCapsule = {};

    if (title !== initialState.title) updatedCapsule.title = title;
    if (description !== initialState.description) updatedCapsule.description = description;
    if (content !== initialState.content) updatedCapsule.content = content;

    // Only proceed if there are any changes
    if (Object.keys(updatedCapsule).length > 0) {
      // Include the id in the updatedCapsule object
      updatedCapsule.id = capsuleData._id;

      console.log('Updated Capsule:', updatedCapsule); // Debugging line

      // Dispatch the update action with updated capsule data
      dispatch(updateCapsule(updatedCapsule));
      toast.success('Capsule updated successfully!');
    } else {
      // If no changes, show a message and prevent dispatch
      toast.info('No changes detected.');
    }
  };

  return (
    <>
      <div className='h-screen w-100vw p-10 edit-capsule-container'>
        <Link to="/" className="absolute top-2 left-4">
          <img src={leftArrow} alt="home icon" width="35" height="35" />
        </Link>
        <div className="flex justify-center items-center">
          <form
            className="bg-white p-8 rounded-lg shadow-2xl shadow-white w-[50%] text-[#283149]"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label htmlFor="title" className="block font-medium mb-1">
                Title (Max 20 words):
              </label>
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
              <label htmlFor="description" className="block font-medium mb-1">
                Description (Max 50 words):
              </label>
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
              <label htmlFor="content" className="block font-medium mb-1">
                Content (Max 500 words):
              </label>
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
              <button
                type="submit"
                className="bg-[#283149] text-white border-2 border-white hover:bg-white hover:text-[#283149] hover:border-2 hover:border-[#283149] font-bold py-2 px-4 rounded"
              >
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
