import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
  const { isAuthenticated,loading } = useSelector(state => state.user);
  const navigate = useNavigate();

useEffect(() => {
  if (isAuthenticated) {
    navigate('/', { replace: true });
  }
}, [isAuthenticated, navigate]);

  return (
    <>
      <div className='bg-[#FFC8DD] h-[100vh] w-[100vw]'>
        <nav className='h-20 bg-blue-400 p-5 text-white w-100'>
          <ul className='flex justify-start gap-10 cursor-pointer'>
            <Link to="/signin">Sign in</Link>
            <Link to="/signup">Sign up</Link>
          </ul>
        </nav>
      </div>
      {loading && <div className='h-[100vh] w-[100vw] text-white font-semibold text-xl flex flex-col justify-center items-center loadercontainer'>
        <div className="loader"></div>
      </div>}
    </>
  );
}

export default Home;
