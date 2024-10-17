import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if (loading) {
    return <div className='h-[100vh] w-[100vw] text-white font-semibold text-xl flex flex-col justify-center items-center loadercontainer'>
          <div className="loader"></div>
        </div>; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
