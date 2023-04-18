import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";
import logo from "../homiee_logo.png";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink to="/">
          <img src={logo} alt="company logo" />
        </NavLink>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink className={({isActive}) => isActive ? classes.active : classes.navLink} to="/rent">
              Rent
            </NavLink>
          </li>
          <li>
            <NavLink className={({isActive}) => isActive ? classes.active : classes.navLink}  to="/buy">
              Buy
            </NavLink>
          </li>
          <li>
            <NavLink className={({isActive}) => isActive ? classes.active : classes.navLink}  to="/homeOwner">
              For home-owners
            </NavLink>
          </li>
          <li>
            <NavLink className={({isActive}) => isActive ? classes.active : classes.navLink}  to="/admin">
              Admin
            </NavLink>
          </li>
          <li>
          <NavLink className={classes.loginSignup}  to="#">
              Login/Signup
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
