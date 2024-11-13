import React from "react";
import { Link } from "react-router-dom";

function CapsuleCard({ name, description, id, capsule }) {
  return (
    <Link 
      to={`/capsule/${id}`} 
      className="capsulecard-container"
      state={{ capsuleData: capsule }}
    >
      <h1>{name}</h1>
      <p>{description}</p>
      <p>{capsule.visibility === "private" ? "This is a private capsule" : "This is a public capsule"}</p>
      <p>{capsule.isOpen ? "You can now access the capsule" : "The capsule is yet to be open"}</p>
    </Link>
  );
}

export default CapsuleCard;
