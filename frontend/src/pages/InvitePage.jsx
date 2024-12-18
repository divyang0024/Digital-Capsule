import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function InvitePage() {
  const { email } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const capsuleId = queryParams.get('capsuleId'); // Get the capsuleId from the query string

  useEffect(() => {
    const checkEmailAndInvite = async () => {
      try {
        // Check if the email exists in the database
        const response = await axios.get(`https://digital-capsule-backend.vercel.app/user/${email}`, { withCredentials: true });
        console.log(response.data.exists);
        if (response.data.exists) {
          // Email exists, add the capsuleId to the friend's list
          await axios.post(`https://digital-capsule-backend.vercel.app/user/invite`, { email, capsuleId }, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            }
          });
          setLoading(false);
          toast.info('INVITATION ACCEPTED');
          setTimeout(() => {
          }, 3000);
          navigate("/signin");
        } else {
          setLoading(false);
          toast.error('You dont have an account first make an account, then click on this link again');
          setTimeout(() => {
          }, 3000);
          navigate("/signup");
        }
      } catch (error) {
        console.error("Error checking email", error);
        setLoading(false);
        toast.error('You dont have an account first make an account, then click on this link again');
        setTimeout(() => {
        }, 3000);
        navigate("/signup");
      }
    };

    checkEmailAndInvite();
  }, [email, capsuleId, navigate]);

  return (
    <div>
      {loading && (
        <div className="fixed top-0 left-0 z-50 h-full w-full bg-white bg-opacity-50 flex justify-center items-center overflow-y-auto">
          <div className="loader"></div>
        </div>
      )}

    </div>
  );
}

export default InvitePage;
