import { Link } from "react-router-dom";
import styles from "./AboutUs.module.css";

const ServiceCard = ({ title, description, icon, href, actionLabel }) => (
  <article className={styles.service}>
    <img src={icon} alt="" />
    <div className={styles.serviceBody}>
      <h2>{title}</h2>
      <p>{description}</p>
      {href && (
        <Link className={styles.serviceLink} to={href}>
          {actionLabel || "Learn more"}
        </Link>
      )}
    </div>
  </article>
);

export default ServiceCard;
