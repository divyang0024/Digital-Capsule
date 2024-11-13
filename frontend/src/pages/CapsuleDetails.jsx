import React from "react";
import { useLocation } from "react-router-dom";

function CapsuleDetails() {
  const location = useLocation();
  const { capsuleData } = location.state || {};

  if (!capsuleData) {
    return <p>Capsule data not found.</p>;
  }

  return (
    <div>
      <h1>{capsuleData.title}</h1>
      <p>{capsuleData.description}</p>
      <p>{capsuleData.content}</p>
      {capsuleData.media?.map((mediaItem, index) => (
        <img key={index} src={mediaItem.url} alt={`Media ${index}`} />
      ))}
    </div>
  );
}

export default CapsuleDetails;
