import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import leftArrow from '../assets/leftArrow.png'

function Signin() {

  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  })

  const [userExist, setUserExist] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loading == true) {
      setTimeout(() => {
        navigate('/'); 
      }, 3000);
    }
  }, [loading]);

  function handleLoginSuccess() {
    axios.get('http://localhost:5000/api/user/protected', { withCredentials: true })
        .then(response => {
            console.log("after user successfully logs in ",response.data); // Welcome message and user info
        })
        .catch(error => {
            console.error('Error accessing protected route:', error);
        });
}

  async function sendLoginDetailToApi() {
    const url = 'http://localhost:5000/api/user/signin';

    try {
      const response = await axios.post(url, loginFormData, {withCredentials:true});

      if (response.status === 200) {
        console.log("response data login", response.data);
        setLoginFormData({
          username: "",
          password: "",
        })
        localStorage.setItem("user-token", response.data.jwtToken);
        handleLoginSuccess();
        setLoading(true)
        // setTimeout(()=>{
        //   navigate('/');
        // }, 3000);

      } else {
        console.log("Error:", response.data.message);
      }
    } catch (error) {
      console.log("Error while logging in user:", error.response ? error.response.data : error.message);
      setUserExist(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted login formdata", loginFormData)
    sendLoginDetailToApi();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
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
              <span className='mb-9' style={{ '--i': 2 }}>I N</span>
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
                  <p>Enter your credentials to get in</p>
                </div>

                <form className='flex flex-col w-[70%] ' onSubmit={handleSubmit}>
                  <input type="text" name="username" placeholder='Enter Username/Email' className='border-2 border-black rounded-md p-1 m-1' onChange={handleChange}  ></input>
                  <input type="password" name="password" placeholder='Enter Password' className='border-2 border-black rounded-md p-1 m-1' onChange={handleChange}  ></input>
                  <button className='bg-[#35CCED] rounded-md p-1 m-1 text-white'>SIGN IN</button>
                  {!userExist ? (
                    <p className='text-red-600 font-normal'>No such user exists !! Try again.</p>
                  ) : ""}
                </form>
              </div>
              <div className='w-[50%] h-[100%]'>
                <img src="../src/assets/login.jpg" alt="sign up image" className='object-cover h-full' />
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

export default Signin