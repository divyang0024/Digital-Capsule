import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Signin from './pages/Signin.jsx'


function App() {


  return (
    <Router>
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
      </Routes>

    </>
    </Router>
  )
}

export default App
