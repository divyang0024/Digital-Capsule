import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function InvitePage() {
  const { email } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Correctly parse the query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const capsuleId = queryParams.get('capsuleId'); // Get the capsuleId from the query string

  useEffect(() => {
    const checkEmailAndInvite = async () => {
      try {
        // Check if the email exists in the database
        const response = await axios.get(`/api/users/${email}`);
        if (response.data.exists) {
          // Email exists, add the capsuleId to the friend's list
          await axios.post(`/api/users/invite`, { email, capsuleId });
          setLoading(false);
          // Optionally redirect to a confirmation page or dashboard
        } else {
          setLoading(false);
          navigate("/signup"); // Redirect to signup if email doesn't exist
        }
      } catch (error) {
        console.error("Error checking email", error);
        setLoading(false);
        navigate("/signup"); // Redirect to signup on error
      }
    };

    checkEmailAndInvite();
  }, [email, capsuleId, navigate]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>You have been successfully invited to the capsule!</p>
      )}
    </div>
  );
}

export default InvitePage;
