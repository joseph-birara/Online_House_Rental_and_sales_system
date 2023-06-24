import React from "react";
import TeamCard from "./TeamCard";
import JosephImage from "./jossy/Jossy.png";
import DawitImage from "./jossy/Dawit.png";
import FistumIamge from "./jossy/Fitsum.jpg";

const Team = () => {
  const teamMembers = [
    {
      name: "Joseph Birara",
      role: " ",
      description:
        " Joseph Birara is a highly skilled full-stack developer with expertise in the MERN stack (MongoDB, Express.js, React, and Node.js). With a strong background in web development, Joseph has a deep understanding of building robust and scalable applications. He is passionate about solving complex problems and implementing innovative solutions. Joseph is dedicated to delivering high-quality code and has a keen eye for detail. His comprehensive knowledge of the MERN stack enables him to develop seamless end-to-end solutions that meet clients requirements effectively.",
      imageUrl: JosephImage,
    },
    {
      name: "Fitsum Gedefaw",
      role: " ",
      description:
        "Fitsum Gedefaw is a skilled front-end developer with a focus on creating dynamic and engaging user interfaces. With expertise in HTML, CSS, and JavaScript, Fitsum brings websites to life by seamlessly blending design and functionality. He has a keen eye for design aesthetics and a passion for crafting visually stunning websites. Fitsum stays current with the latest front-end frameworks and techniques, enabling him to create responsive and optimized web experiences. His commitment to clean code and user-centered design ensures that his projects meet the highest quality standards.",
      imageUrl: FistumIamge,
    },
    {
      name: "Dawit Andargachew",
      role: "--",
      description:
        "Dawit Andargachew is a talented front-end developer with a specialization in React. With his strong passion for creating intuitive and visually appealing user interfaces, Dawit crafts immersive web experiences that captivate users. He has extensive experience in building responsive and mobile-friendly websites using modern web technologies. Dawit is always up-to-date with the latest front-end trends and best practices, allowing him to deliver cutting-edge solutions. His attention to detail and dedication to creating exceptional user experiences make him a valuable asset to any development team.",
      imageUrl: DawitImage,
    },
    // Add more team members as needed
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Our Team
      </h1>
      <div className="flex flex-wrap justify-center gap-3 ">
        {teamMembers.map((member, index) => (
          <TeamCard key={index} {...member} />
        ))}
      </div>
    </div>
  );
};

export default Team;
