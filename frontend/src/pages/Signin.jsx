import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, clearErrors } from '../actions/userActions.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signInImg from "../assets/login.jpg";
import leftArrow from '../assets/leftArrow.png';

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.user);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isFirstVisit) {
      toast.warning('Please sign up if you don\'t have an account yet.', {
        onClose: () => setIsFirstVisit(false)
      });
    } else if (error) {
      toast.error(error.msg);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      toast.success('Login Successful! Redirecting...');
      setTimeout(() => navigate('/'), 3000);
    }
  }, [dispatch, error, isAuthenticated, navigate, isFirstVisit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginFormData.email, loginFormData.password));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value
    });
  };

  return (
    <>
      <div className='bg-[#35CCED] h-[100vh] w-[100vw] flex flex-col '>
        <Link to="/" className='absolute top-2 left-4'>
          <img src={leftArrow} alt="home icon" width="35" height="35" />
        </Link>

        <div className=' m-24'>
          <div className='text-white text-5xl font-semibold waviy flex flex-col'>
            <span className='mb-9' style={{ '--i': 1 }}>S I G N</span>
            <span className='mb-9' style={{ '--i': 2 }}>I N</span>
          </div>
        </div>

        <div className='h-[90vh] w-[70%] bg-white absolute right-10 top-10 rounded-lg px-24'>
          <div className='text-[#35CCED] absolute top-5 left-5 font-medium '>
            <Link to="/signup">Signup</Link> / <Link to="/signin">Signin</Link>
          </div>

          <div className='flex h-[100%] justify-center'>
            <div className='w-[50%] h-[100%] flex flex-col items-start justify-center'>
              <div className='flex flex-col mt-[-15%] mb-[15%]'>
                <h1 className='font-semibold text-3xl'>Get Started Now</h1>
                <p>Enter your credentials to get in</p>
              </div>

              <form className='flex flex-col w-[70%]' onSubmit={handleSubmit}>
                <input type="email" name="email" required placeholder='Enter Email' className='border-2 border-black rounded-md p-1 m-1' onChange={handleChange}></input>
                <input type="password" name="password" required placeholder='Enter Password' className='border-2 border-black rounded-md p-1 m-1' onChange={handleChange}></input>

                <button className='bg-[#35CCED] rounded-md p-1 m-1 text-white' disabled={loading}>SIGN IN</button>
              </form>
            </div>
            <div className='w-[50%] h-[100%]'>
              <img src={signInImg} alt="sign in image" className='object-cover h-full' />
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className='h-[100vh] w-[100vw] text-white font-semibold text-xl flex flex-col justify-center items-center loadercontainer'>
          <div className="loader"></div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default Signin;