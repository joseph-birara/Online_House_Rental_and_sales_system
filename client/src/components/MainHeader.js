import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";
import logo from "../homiee_logo.png";
import { Fragment, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { UserProfile } from "./dashboard/components";
import { useStateContext } from "../contexts/DashboardContextProvider";
import RetriveLocallyStoredData from "../pages/Auth/RetriveLocallyStoredData";


const MainHeader = () => {

  const { token, user, setToken, setUser } = useContext(UserContext)
  const { handleClick, isClicked } = useStateContext();

  // retrive locally stored user data 
  useEffect(() => {
    const { user_token, user_profile_data } = RetriveLocallyStoredData();
    setToken(JSON.parse(user_token))
    setUser(JSON.parse(user_profile_data))

  }, [])

  const ProfileSection = () => {
    return (<div className="flex justify-between md:ml-6 md:mr-6 relative">
      <div
        className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg transform scale-125"
        onClick={() => handleClick("userProfile")}
      >
        <img
          className="rounded-full w-11 h-11"
          src={"https://cdn.stocksnap.io/img-thumbs/960w/woman-portrait_HVMC9QETXW.jpg"}
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

          {user && user.userType !== 'admin' && <li>
            <NavLink className={({ isActive }) => isActive ? classes.active : classes.navLink} to="/homeOwner">
              For home-owners
            </NavLink>
          </li>
          }

          {user && user.userType === 'admin' && <li>
            <NavLink className={({ isActive }) => isActive ? classes.active : classes.navLink} to="/admin">
              Admin
            </NavLink>
          </li>
          }
          <li>
            {token ? <ProfileSection /> :
              <NavLink className={classes.loginSignup} to="/login" >
                <Fragment > Login/Signup </Fragment>
              </NavLink>
            }
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
