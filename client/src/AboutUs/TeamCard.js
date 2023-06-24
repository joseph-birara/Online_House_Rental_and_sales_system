import React from "react";

const TeamMemberCard = ({ name, role, description, imageUrl }) => {
  return (
    <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <img className="h-1/4  block rounded-lg mx-auto object-cover" src={imageUrl} alt={name} />
      <div className="py-4 px-6">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600 my-3 pr-4"><hr /></p>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
