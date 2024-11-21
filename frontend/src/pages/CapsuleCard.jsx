import React from "react";
import { Link } from "react-router-dom";
import { FaUnlock } from "react-icons/fa6";

function CapsuleCard({ name, description, id, capsule }) {
  return (
    <Link
      to={`/capsule/${id}`}
      className={`capsulecard-container shadow-xl capsule-design ${
        capsule.isOpen ? "border-2 border-white" : "border-2 border-gray-500"
      }`}
      state={{ capsuleData: capsule }}
    >
      {capsule.isOpen ? (
        <div className="flex flex-col justify-center items-center text-center text-lg text-white font-semibold gap-3">
          <h1>Capsule's open! fam</h1>
          <FaUnlock />
        </div>
      ) : (
        <div className="text-center">
          <h1 className="font-bold">{name}</h1>
          <p>{description}</p>
          <p>
            {capsule.visibility === "private"
              ? "This is a private capsule"
              : "This is a public capsule"}
          </p>
          <p>
            {capsule.isOpen
              ? "You can now access the capsule"
              : "The capsule is yet to be open"}
          </p>
        </div>
      )}
    </Link>
  );
}

export default CapsuleCard;
