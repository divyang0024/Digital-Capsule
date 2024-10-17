import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import Signin from './pages/Signin.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './actions/userActions.js';
import ProtectedRoute from "./protectedRoute/ProtectedRoute.jsx";
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<ProtectedRoute element={Dashboard} />} />
      </Routes>
    </Router>
  );
}

export default App;
