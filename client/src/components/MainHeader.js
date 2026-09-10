import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";
import logo from "../homiee_logo.png";
import { Fragment, useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { UserProfile } from "./dashboard/components";
import { useStateContext } from "../contexts/DashboardContextProvider";


const MainHeader = () => {

  const { token, user } = useContext(UserContext)
  const { handleClick, isClicked } = useStateContext();

  const ProfileSection = () => {
    return (<div className="flex justify-between md:ml-6 md:mr-6 relative">
      <div
        className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg transform scale-125"
        onClick={() => handleClick("userProfile")}
      >
        <img
          className="rounded-full w-11 h-11"
          src={user && user.image}
          onError={(e) => {
            e.target.src = 'https://res.cloudinary.com/dmegiw31y/image/upload/v1687634119/HomeRental/alt-image_rn3zbk.webp';
          }}
          alt="user-profile"
        />
      </div>
      {isClicked.userProfile && <UserProfile />}
    </div>)
  }

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

          {user && user.userType && <li>
            {user.userType === 'owner' && <NavLink className={({ isActive }) => isActive ? classes.active : classes.navLink} to="/homeOwner">
              For Home-owners
            </NavLink>}
            {user.userType === 'tenant' && <NavLink className={({ isActive }) => isActive ? classes.active : classes.navLink} to="/tenant">
              For Tenant
            </NavLink>}
            {user.userType === 'buyer' && <NavLink className={({ isActive }) => isActive ? classes.active : classes.navLink} to="/buyer">
              For Buyers
            </NavLink>}
            {user.userType === 'admin' && <NavLink className={({ isActive }) => isActive ? classes.active : classes.navLink} to="/admin">
              For Admin
            </NavLink>}
          </li>
          }

          <li>
            {token ? <ProfileSection /> :
              <div className="flex items-center gap-4">
                <NavLink className={({ isActive }) => isActive ? classes.active : classes.navLink} to="/register">
                  Register
                </NavLink>
                <NavLink className={classes.loginSignup} to="/login" >
                  <Fragment> Log in </Fragment>
                </NavLink>
              </div>
            }
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
