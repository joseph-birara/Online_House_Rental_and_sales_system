import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";
import logo from "../homiee_logo.png";
import { Fragment, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { UserProfile } from "./dashboard/components";
import { useStateContext } from "../contexts/DashboardContextProvider";
import RetriveLocallyStoredData from "../pages/Auth/RetriveLocallyStoredData";

const MainHeader = () => {
  const { token, user, setToken, setUser } = useContext(UserContext);
  const { handleClick, isClicked } = useStateContext();

  // retrive locally stored user data
  // useEffect(() => {
  //   const { user_token, user_data } = RetriveLocallyStoredData();
  //   console.log("user_data", user_data);
  //   if (user_data != undefined) {
  //     console.log("--- typeof user_data", typeof user_data);
  //     console.log("--- user_data", JSON.parse(user_data));
  //     setUser(JSON.parse(user_data));
  //   }
  //   if (user_token) setToken(JSON.parse(user_token));
  // }, []);

  const ProfileSection = () => {
    return (
      <div className="flex justify-between md:ml-6 md:mr-6 relative">
        <div
          className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg transform scale-125"
          onClick={() => handleClick("userProfile")}
        >
          <img
            className="rounded-full w-11 h-11"
            src={user && user.image}
            onError={(e) => {
              e.target.src =
                "https://media.gettyimages.com/id/1227618807/vector/human-face-avatar-icon-profile-for-social-network-man-vector-illustration.jpg?s=1024x1024&w=gi&k=20&c=-Iz47dY99Hx3S8JAkVLKvzQN65Qn8m7UPFAMbJvfd1Y=";
            }}
            alt="user-profile"
          />
        </div>
        {isClicked.userProfile && <UserProfile />}
      </div>
    );
  };

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
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : classes.navLink
              }
              to="/rent"
            >
              Rent
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : classes.navLink
              }
              to="/buy"
            >
              Buy
            </NavLink>
          </li>

          {user && user.userType && (
            <li>
              {user.userType === "owner" && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? classes.active : classes.navLink
                  }
                  to="/homeOwner"
                >
                  For Home-owners
                </NavLink>
              )}
              {user.userType === "tenant" && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? classes.active : classes.navLink
                  }
                  to="/tenant"
                >
                  For Tenant
                </NavLink>
              )}
              {user.userType === "buyer" && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? classes.active : classes.navLink
                  }
                  to="/buyer"
                >
                  For Buyers
                </NavLink>
              )}
              {user.userType === "admin" && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? classes.active : classes.navLink
                  }
                  to="/admin"
                >
                  For Admin
                </NavLink>
              )}
            </li>
          )}

          <li>
            {token ? (
              <ProfileSection />
            ) : (
              <NavLink className={classes.loginSignup} to="/login">
                <Fragment> Login/Signup </Fragment>
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
