import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getUserCapsules, updateCapsuleStatus } from '../actions/capsuleAction.js';
import CapsuleCard from './CapsuleCard.jsx';
import '../styles/Mycapsule.css';

function Mycapsule() {
  const dispatch = useDispatch();
  const { error, capsule, loading } = useSelector(state => state.capsule);
  const [capsules, setCapsules] = useState([]);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Fetch capsules on initial load
  useEffect(() => {
    dispatch(getUserCapsules());
  }, [dispatch]);

  // Update local state and clear errors after capsule data fetch
  useEffect(() => {
    if (capsule?.data) {
      const updatedCapsules = capsule.data.map(cap => ({
        ...cap,
        isOpen: new Date(cap.releaseAt).getTime() <= Date.now()
      }));
      setCapsules(updatedCapsules);
      dispatch(clearErrors());
    }
  }, [capsule, dispatch]);

  // Handle `isOpen` updates at regular intervals
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
      setCapsules(prevCapsules => {
        const updatedCapsules = prevCapsules.map(cap => ({
          ...cap,
          isOpen: new Date(cap.releaseAt).getTime() <= Date.now()
        }));

        // Dispatch action to update DB if any capsule's isOpen has changed to true
        const capsulesToUpdate = updatedCapsules.filter(
          (cap, index) => cap.isOpen && !prevCapsules[index].isOpen
        );
        if (capsulesToUpdate.length > 0) {
          dispatch(updateCapsuleStatus(capsulesToUpdate.map(cap => cap._id)));
        }

        return updatedCapsules;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const getTimeRemaining = (releaseAt) => {
    let timeLeft = Math.max(0, Math.floor((new Date(releaseAt).getTime() - currentTime) / 1000));
    const years = Math.floor(timeLeft / (365 * 24 * 3600));
    timeLeft %= 365 * 24 * 3600;
    const months = Math.floor(timeLeft / (30 * 24 * 3600));
    timeLeft %= 30 * 24 * 3600;
    const days = Math.floor(timeLeft / (24 * 3600));
    timeLeft %= 24 * 3600;
    const hours = Math.floor(timeLeft / 3600);
    timeLeft %= 3600;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${years}y ${months}m ${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 z-50 h-full w-full bg-white bg-opacity-50 flex justify-center items-center overflow-y-auto">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="mycapsule-container">
          {capsules.map((capsule) => (
            capsule.isOpen ? (
              <CapsuleCard
                key={capsule._id}
                name={capsule.title}
                description={capsule.description}
                id={capsule._id}
                capsule={capsule}
              />
            ) : (
              <div
                key={capsule._id}
                className="capsulecard-container relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: capsule.media[0]?.url ? `url(${capsule.media[0].url})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(8px)',
                    transform: 'scale(1.1)',
                  }}
                ></div>

                <div className="relative z-10 p-4 bg-black bg-opacity-30 h-full flex flex-col justify-center">
                  <h1 className="text-white text-2xl font-bold mb-2">{capsule.title}</h1>
                  <p className="text-white mb-4">{capsule.description}</p>
                  <p className="text-white font-medium">Opens in: {getTimeRemaining(capsule.releaseAt)}</p>
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </>
  );
}

export default Mycapsule;
