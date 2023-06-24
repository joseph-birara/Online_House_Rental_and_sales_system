import React from "react";
import ServiceCard from "./ServiceCard";
import rentalIcon from "./jossy/rent.jpg";
import salesIcon from "./jossy/Sale.jpg";
import managementIcon from "./jossy/manage.jpg";

const Services = () => {
  const services = [
    {
      title: "House Rental",
      description:
        "Find the perfect rental property for your needs and budget...",
      icon: rentalIcon,
    },
    {
      title: "House Sales",
      description:
        "Buy or sell your dream home with the help of our expert realtors...",
      icon: salesIcon,
    },
    {
      title: "Home Management",
      description:
        "Ensure your property is well-maintained and taken care of...",
      icon: managementIcon,
    },
    // Add more services as needed
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Our Services
      </h1>
      <div className="flex  flex-wrap gap-3 justify-center">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
