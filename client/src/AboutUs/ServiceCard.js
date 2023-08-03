import React from "react";

const ServiceCard = ({ title, description, icon }) => {
  return (
    <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <img className="w-full h-48 object-cover" src={icon} alt="image" />
      <div className="py-4 px-6">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
