import styles from "./AboutUs.module.css";

const TeamMemberCard = ({ name, role, description, imageUrl }) => (
  <article className={styles.member}>
    <img className={styles.photo} src={imageUrl} alt={name} />
    <div className={styles.memberBody}>
      <h2>{name}</h2>
      {role && <span className={styles.role}>{role}</span>}
      <p>{description}</p>
    </div>
  </article>
);

export default TeamMemberCard;
