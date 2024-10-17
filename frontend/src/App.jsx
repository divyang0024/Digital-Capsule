import { useEffect } from 'react'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Signin from './pages/Signin.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { useDispatch,useSelector } from 'react-redux'
import { loadUser } from './actions/userActions.js'

function App() {
const {isAuthenticated,user}=useSelector(state=>state.user);
const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadUser());
  },[]);

console.log(user);

  return (
    <Router>
    <>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Dashboard/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
      </Routes>

    </>
    </Router>
  )
}

export default App
