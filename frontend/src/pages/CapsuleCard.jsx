import React from "react";
import { Link } from "react-router-dom";

function CapsuleCard({ name, description, id,capsule }) {
  console.log(capsule);
  return (
    <Link to={`/capsule/${id}`} className="capsulecard-container">
      <h1>{name}</h1>
      <p>{description}</p>
      <p>{capsule.visibility=="private"?"this is a private capsule":"this is a public capsule"}</p>
      <p>{capsule.isOpen?"you can now access the capsule":"the capsule is yet to be open"}</p>
    </Link>
  );
}

export default CapsuleCard;