import { useEffect, useState } from 'react';
import { loadUser } from '../actions/userActions';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import bgImage from '../assets/bg2.webp';
import Sections from '../components/Sections';

function Home() {
  const { isAuthenticated, loading } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [activeModule, setActiveModule] = useState('HOME');

  const handleModuleClick = (module) => {
    setActiveModule(module);
    if (module === "SIGN IN") {
      navigate("/signin");
    }
    if (module === "REGISTER") {
      navigate("/signup");
    }
  };

  return (
    <div>
      {loading ? (
        <div className="h-[100vh] w-[100vw] text-white font-semibold text-xl flex flex-col justify-center items-center loadercontainer">
          <div className="loader"></div>
        </div>
      ) : (
        <div className='overflow-x-hidden bg-[#FFF7E3]'>

          <header className='w-[100vw] h-[10vh] flex justify-center items-center'>
            <ul className='flex w-[100vw] h-[100%] mx-44 text-[#5B5F97] font-semibold text-md justify-between cursor-pointer'>
              {['HOME', 'DASHBOARD', 'CREATE CAPSULE', 'SIGN IN', 'REGISTER', 'WHY YAADGAAR?'].map((module) => (
                <li
                  key={module}
                  onClick={() => handleModuleClick(module)}
                  className={`${activeModule === module ? 'bg-[#5B5F97] text-white pt-5 px-10' : 'pt-5 px-10'}`}
                >
                  {module}
                </li>
              ))}
            </ul>
          </header>

          <div className='h-[80vh] w-[100vw] overflow-hidden flex flex-col justify-center items-center bg-cover bg-center'
            style={{
              backgroundImage: `url(${bgImage})`,
              boxShadow: 'inset 5px 5px 15px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div>
              <h1 className='pop-outin text-6xl font-bold text-[#FFF7E3]'> YAADGAAR </h1>
            </div>

            <div className='m-10 font-bold text-4xl wordCarousel'>
              <h4 className="items-center justify-center ">
                <span className='text-[#7f84cd] font-semibold' style={{ textShadow: 'inset 5px 5px 15px 10px #FED9B7' }}>HOLD ONTO YOUR </span>
                <div>
                  <ul className="flip5 text-[#FFF7E3]">
                    <li>MEMORIES</li>
                    <li>STORIES</li>
                    <li>MOMENTS</li>
                  </ul>
                </div>
              </h4>
            </div>
          </div>

          <Sections />

          <footer className='bg-[#FF6B6B] h-[10vh] w-[100vw] p-[2%] mt-[10vh]'>
            <ul className='text-white text-lg font-semibold'>
              <li>yaadgaar</li>
            </ul>
          </footer>
        </div>
      )}
    </div>
  );
}

export default Home;
