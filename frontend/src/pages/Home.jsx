import { useState } from 'react'
import {Link} from 'react-router-dom'

function Home() {

  return (
    <>
      <div className='bg-[#FFC8DD] h-[100vh] w-[100vw]'>

        <nav className='h-20 bg-blue-400 p-5 text-white w-100'>
          <ul className='flex justify-start gap-10 cursor-pointer'>
            <Link to="/">Home</Link>
            <Link to="/signup">Sign up</Link>
          </ul>
        </nav>
      </div>

    </>
  )
}

export default Home











