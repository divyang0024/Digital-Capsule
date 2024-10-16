import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Signin from './Signin';
import { register } from '../actions/userActions.js';
import leftArrow from '../assets/leftArrow.png'
import { useSelector,useDispatch } from 'react-redux';

function Signup() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading,error,isAuthenticated,user}=useSelector((state)=>state.user);
  const [alreadyExist, setAlreadyExist] = useState(false)
  const [isloading, setLoading] = useState(false)

console.log(loading,error,isAuthenticated,user);

  useEffect(() => {
    if (isloading == true) {
      setTimeout(() => {
        navigate('/');
      }, 4000);
    }
  }, [dispatch,loading]);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    bio: ""
  })


  // async function addUserToApi() {
  //   const url = 'http://localhost:5000/api/user/signup';

  //   try {
  //     const response = await axios.post(url, formData, {withCredentials:true});

  //     if (response.status === 201) {
  //       console.log(response.data);
  //       console.log("User created from frontend", response);
  //       setFormData({
  //         name: "",
  //         username: "",
  //         email: "",
  //         password: "",
  //         dob: "",
  //         gender: "",
  //         bio: ""
  //       })
  //       setLoading(true);
  //     } else {
  //       console.log("Error:", response.data.message);
  //     }
  //   } catch (error) {
  //     console.log("Error while creating user:", error.response ? error.response.data : error.message);
  //     setAlreadyExist(true)
  //   }
  // }


  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm=new FormData();
    myForm.set("name",formData.name);
    myForm.set("username",formData.username);
    myForm.set("password",formData.password);
    myForm.set("gender",formData.gender);
    myForm.set("email",formData.email);
    dispatch(register(formData));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  return (
    <>
          <div className='bg-[#35CCED] h-[100vh] w-[100vw] flex flex-col '>

            <Link to="/" className='absolute top-2 left-4' >
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
                <Link to="/signup">Signup </Link>
                <span>/</span>
                <Link to="/signin"> Signin</Link>
              </div>

              <div className='flex h-[100%] justify-center'>
                <div className='w-[50%] h-[100%] flex flex-col items-start justify-center' >

                  <div className='flex flex-col mt-[-15%] mb-[15%]' >
                    <h1 className='font-semibold text-3xl'>Get Started Now</h1>
                    <p>Enter your credentials to create your account</p>
                  </div>

                  <form className='flex flex-col w-[70%] ' onSubmit={handleSubmit}>
                    <input type="text" name="name" required placeholder='Enter Name' className='border-2 border-black rounded-md p-1 m-1' onChange={handleChange} ></input>
                    <input type="text" name="username" required placeholder='Enter Username' className='border-2 border-black rounded-md p-1 m-1' onChange={handleChange}  ></input>
                    <input type="text" name="email" required placeholder='Enter Email' className='border-2 border-black rounded-md p-1 m-1' onChange={handleChange}  ></input>
                    <input type="password" name="password" required placeholder='Enter Password (min 8 characters)' minLength={8} maxLength={30} className='border-2 border-black rounded-md p-1 m-1' onChange={handleChange}  ></input>

                    <div className='flex justify-between max-w-[60%]'>
                      <input type="date" name="dob" required className='border-2 border-black rounded-md p-1 m-1' onChange={handleChange}  ></input>
                      <select required name="gender" id="gender" defaultValue="" className='border-2 border-black p-1 my-1 rounded-md' onChange={handleChange} >
                        <option value="" disabled>Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Prefer not to say</option>
                      </select>
                    </div>

                    <textarea name="bio" id="bio" rows="1" cols="48" maxLength="200" placeholder='Tell us something about yourself (max 200 characters)' className='border-2 border-black p-1 m-1 rounded-md overflow-hidden'></textarea>

                    <button className='bg-[#35CCED] rounded-md p-1 m-1 text-white'>SIGN UP</button>
                    {alreadyExist ? (
                      <p className='text-red-600 font-normal'>Username/Email already exists !! Try again.</p>
                    ) : ""}

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
                  {/* <span className='text-[#35CCED]'> Redirecting to Yaadgaar !!</span> */}
                </div>
          )}
    </>
  )
}

export default Signup



