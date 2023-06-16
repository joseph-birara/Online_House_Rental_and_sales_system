import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";
import logo from "../homiee_logo.png";
import { Fragment, useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";

const MainHeader = () => {

  const { token , user } = useContext(UserContext)

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink to="/">
          <img src={logo} alt="company logo" />
        </NavLink>
      </div>

      <nav >
        <ul>
          <li>
            <NavLink className={({ isActive }) => isActive ? classes.active : classes.navLink} to="/rent">
              Rent
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? classes.active : classes.navLink} to="/buy">
              Buy
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? classes.active : classes.navLink} to="/homeOwner">
              For home-owners
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? classes.active : classes.navLink} to="/tenant">
              Tenants
            </NavLink>
          </li>

          
          <li>
            <NavLink className={({ isActive }) => isActive ? classes.active : classes.navLink} to="/admin">
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink className={classes.loginSignup} to="/login">
            { token ? (<Fragment> {user.name} </Fragment> ) :(<Fragment> Login/Signup </Fragment> ) }
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
