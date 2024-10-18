import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, clearErrors } from '../actions/userActions.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import leftArrow from '../assets/leftArrow.png';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    bio: ""
  });

  useEffect(() => {
    if (error) {
      toast.error(error.msg);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      toast.success('Signup Successful! Redirecting...');
      setTimeout(() => navigate('/'), 3000);
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    Object.keys(formData).forEach((key) => myForm.set(key, formData[key])); 
    dispatch(register(myForm));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
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
            <span className='mb-9' style={{ '--i': 2 }}>U P</span>
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
                <p>Enter your credentials to create your account</p>
              </div>

              <form className='flex flex-col w-[70%]' onSubmit={handleSubmit}>
                <input type="text" name="name" required placeholder='Enter Name' className='border-2 border-black rounded-md p-1 m-1' onChange={handleChange}></input>
                <input type="text" name="username" required placeholder='Enter Username' className='border-2 border-black rounded-md p-1 m-1' onChange={handleChange}></input>
                <input type="email" name="email" required placeholder='Enter Email' className='border-2 border-black rounded-md p-1 m-1' onChange={handleChange}></input>
                <input type="password" name="password" required placeholder='Enter Password' className='border-2 border-black rounded-md p-1 m-1' onChange={handleChange}></input>

                <div className='flex justify-between max-w-[60%]'>
                  <input type="date" name="dob" required className='border-2 border-black rounded-md p-1 m-1' onChange={handleChange}></input>
                  <select required name="gender" id="gender" defaultValue="" className='border-2 border-black p-1 my-1 rounded-md' onChange={handleChange}>
                    <option value="" disabled>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Prefer not to say</option>
                  </select>
                </div>

                <textarea name="bio" id="bio" rows="1" cols="48" maxLength="200" placeholder='Tell us something about yourself (max 200 characters)' className='border-2 border-black p-1 m-1 rounded-md overflow-hidden'></textarea>

                <button className='bg-[#35CCED] rounded-md p-1 m-1 text-white' disabled={loading}>SIGN UP</button>
              </form>
            </div>
            <div className='w-[50%] h-[100%]'>
              <img src="../src/assets/signup.avif" alt="sign up image" className='object-cover h-full' />
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

export default Signup;
