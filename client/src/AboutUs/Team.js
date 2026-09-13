import TeamCard from "./TeamCard";
import AboutLayout from "./AboutLayout";
import styles from "./AboutUs.module.css";
import JosephImage from "./Images/Jossy.png";
import DawitImage from "./Images/Dawit.png";
import FistumIamge from "./Images/Fitsum.jpg";

const Team = () => {
  const teamMembers = [
    {
      name: "Joseph Birara",
      role: "Full-stack developer",
      description:
        "Joseph is a full-stack developer with expertise in the MERN stack. He focuses on robust, scalable applications and careful, high-quality code — from the database through to the interface.",
      imageUrl: JosephImage,
    },
    {
      name: "Fitsum Gedefaw",
      role: "Front-end developer",
      description:
        "Fitsum builds dynamic, engaging interfaces with HTML, CSS, and JavaScript. He blends design and functionality into responsive experiences that stay clean and user-centered.",
      imageUrl: FistumIamge,
    },
    {
      name: "Dawit Andargachew",
      role: "Front-end developer",
      description:
        "Dawit specializes in React and Node.js, with a focus on intuitive, mobile-friendly interfaces. He stays current with front-end practice and cares about the details that make a product easy to use.",
      imageUrl: DawitImage,
    },
  ];

  return (
    <AboutLayout
      eyebrow="About us"
      title="The people behind Homiee"
      subtitle="A small team building a calmer way to rent, buy, and list homes in Ethiopia."
    >
      <div className={styles.teamGrid}>
        {teamMembers.map((member) => (
          <TeamCard key={member.name} {...member} />
        ))}
      </div>
    </AboutLayout>
  );
};

export default Team;
