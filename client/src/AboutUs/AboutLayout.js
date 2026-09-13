import { NavLink } from "react-router-dom";
import styles from "./AboutUs.module.css";

const AboutLayout = ({ eyebrow, title, subtitle, children }) => (
  <section className={styles.page}>
    <div className={styles.intro}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
    <nav className={styles.aboutNav} aria-label="About pages">
      <NavLink
        to="/team"
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        Team
      </NavLink>
      <NavLink
        to="/service"
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        Services
      </NavLink>
      <NavLink
        to="/termsofservice"
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        Terms
      </NavLink>
    </nav>
    {children}
  </section>
);

export default AboutLayout;
