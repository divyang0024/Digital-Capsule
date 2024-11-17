import { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getUserCapsules, updateCapsuleStatus } from '../actions/capsuleAction.js';
import CapsuleCard from './CapsuleCard.jsx';
import { FaCalendarAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import '../styles/Mycapsule.css';
// Separate utility functions
const formatTimeRemaining = (timeLeft) => {
  const times = {
    years: Math.floor(timeLeft / (365 * 24 * 3600)),
    months: Math.floor((timeLeft % (365 * 24 * 3600)) / (30 * 24 * 3600)),
    days: Math.floor((timeLeft % (30 * 24 * 3600)) / (24 * 3600)),
    hours: Math.floor((timeLeft % (24 * 3600)) / 3600),
    minutes: Math.floor((timeLeft % 3600) / 60),
    seconds: timeLeft % 60
  };

  return `${times.years}y ${times.months}m ${times.days}d ${times.hours}h ${times.minutes}m ${times.seconds}s`;
};

const truncateText = (text, wordCount) => {
  const words = text.split(" ");
  return words.length > wordCount
    ? words.slice(0, wordCount).join(" ") + "....."
    : text;
};

function Mycapsule() {
  const dispatch = useDispatch();
  const { error, capsule, loading } = useSelector(state => state.capsule);
  const [capsules, setCapsules] = useState([]);
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const [nextOpenTime, setNextOpenTime] = useState(null);
  const [openedCapsules] = useState(new Set());

  const calculateNextOpenTime = useCallback((capsulesList) => {
    const now = Date.now();
    return capsulesList.reduce((nextTime, cap) => {
      const openTime = new Date(cap.releaseAt).getTime();
      if (openTime > now && (!nextTime || openTime < nextTime)) {
        return openTime;
      }
      return nextTime;
    }, null);
  }, []);

  // Initial capsule fetch
  useEffect(() => {
    dispatch(getUserCapsules());
  }, [dispatch]);

  // Process capsule data and update states
  useEffect(() => {
    if (!capsule?.data) return;

    const now = Date.now();
    const updatedCapsules = capsule.data.map(cap => ({
      ...cap,
      isOpen: new Date(cap.releaseAt).getTime() <= now
    }));

    // Handle initially open capsules
    const newlyOpenedIds = updatedCapsules
      .filter(cap => cap.isOpen && !cap.status?.includes('opened'))
      .map(cap => cap._id);

    if (newlyOpenedIds.length > 0) {
      dispatch(updateCapsuleStatus(newlyOpenedIds));
      newlyOpenedIds.forEach(id => openedCapsules.add(id));
    }

    setCapsules(updatedCapsules);
    setNextOpenTime(calculateNextOpenTime(updatedCapsules));
    dispatch(clearErrors());
  }, [capsule, dispatch, calculateNextOpenTime, openedCapsules]);

  // Timer and capsule status update logic
  useEffect(() => {
    const checkAndUpdateCapsules = () => {
      const now = Date.now();
      setCurrentTime(now);

      if (nextOpenTime && now >= nextOpenTime) {
        setCapsules(prevCapsules => {
          const updatedCapsules = prevCapsules.map(cap => ({
            ...cap,
            isOpen: new Date(cap.releaseAt).getTime() <= now
          }));

          const newlyOpenedIds = updatedCapsules
            .filter(cap =>
              new Date(cap.releaseAt).getTime() <= now &&
              !cap.status?.includes('opened') &&
              !openedCapsules.has(cap._id)
            )
            .map(cap => cap._id);

          if (newlyOpenedIds.length > 0) {
            dispatch(updateCapsuleStatus(newlyOpenedIds));
            newlyOpenedIds.forEach(id => openedCapsules.add(id));
          }

          setNextOpenTime(calculateNextOpenTime(updatedCapsules));
          return updatedCapsules;
        });
      }
    };

    const intervalId = setInterval(checkAndUpdateCapsules, 1000);
    checkAndUpdateCapsules();

    return () => clearInterval(intervalId);
  }, [dispatch, nextOpenTime, calculateNextOpenTime, openedCapsules]);

  const getTimeRemaining = useCallback((releaseAt) => {
    const timeLeft = Math.max(0, Math.floor((new Date(releaseAt).getTime() - currentTime) / 1000));
    return formatTimeRemaining(timeLeft);
  }, [currentTime]);

  if (loading && capsules.length === 0) {
    return (
      <div className="fixed top-0 left-0 z-50 h-full w-full bg-white bg-opacity-50 flex justify-center items-center overflow-y-auto">
        <div className="loader"></div>
      </div>
    );
  }

  const renderCapsuleCard = (capsule) => capsule.isOpen ? (
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
      className="relative overflow-hidden flex flex-col rounded-2xl cursor-pointer shadow-xl capsule-design"
    >
      <div
        className="absolute inset-0 z-0 rounded-2xl"
        style={{
          backgroundImage: capsule.media[0]?.url ? `url(${capsule.media[0].url})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          transform: "scale(1.1)",
        }}
      />
      <div className="relative z-10 p-4 bg-black bg-opacity-30 h-full flex flex-col justify-center rounded-2xl">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-white text-2xl font-bold mb-2">
            {truncateText(capsule.title, 3)}
          </h1>
          <div className="text-white flex flex-row gap-3 mb-3">
            <CiEdit />
            <MdDelete />
          </div>
        </div>
        <p className="text-white mb-4">{truncateText(capsule.description, 5)}</p>
        <p className="text-white font-medium flex items-center gap-3">
          <FaCalendarAlt /> Opens in: {getTimeRemaining(capsule.releaseAt)}
        </p>
      </div>
    </div>
  );

  return (
    <div className="mycapsule-container">
      {capsules.map(renderCapsuleCard)}
    </div>
  );
}

export default Mycapsule;