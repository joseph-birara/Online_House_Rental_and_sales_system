import React, { useContext, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../../../contexts/DashboardContextProvider";
import { BsCurrencyDollar, BsShield } from "react-icons/bs";
import { UserContext } from "../../../contexts/UserContextProvider";
import { MdLogout } from 'react-icons/md';
import { Navigate, useNavigate } from "react-router-dom";
import LogOut from "../../../pages/Auth/LogOutSession";


const UserProfile = () => {
  const { setIsClicked, initialState } = useStateContext();
  const { user, setToken, setUser } = useContext(UserContext)
  const navigate = useNavigate();

  const userProfileData = [
    {
      icon: <BsCurrencyDollar />,
      title: "My Profile",
      desc: "Update my Profile",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
    },
    {
      icon: <BsShield />,
      title: "My Inbox",
      desc: "Messages & Emails",
      iconColor: "rgb(0, 194, 146)",
      iconBg: "rgb(235, 250, 242)",
    },
    {
      icon: <MdLogout />,
      title: "Log Out",
      desc: "Logout and end your session",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(23 134 250)",
    },
  ];

  var accountDescription = ""
  if (user.userType === 'admin')
    accountDescription = 'Administrator'
  else if (user.superAdmin)
    accountDescription = 'Super Administrator'
  else if (user.userType === 'owner')
    accountDescription = "Home Owner"
  else if (user.userType === 'tenant')
    accountDescription = "Tenant"

  const HandleClick = (title) => {

    if (title === 'Log Out') {
      window.localStorage.clear()
      setIsClicked(initialState) // remove the profile icon menu
      navigate('/')

      // clear the states saved before
      setToken('')
      setUser('')

    }
  }

  return (
    <div className="nav-item absolute right-1 top-3 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>

        <button
          type="button"
          onClick={() => setIsClicked(initialState)}
          className='outline rounded-full text-[#99abb4] text-2xl p-3  hover:drop-shadow-xl hover:bg-light-gray'
        >
          <MdOutlineCancel className="block" />
        </button>

      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded h-auto w-24"
          src={user.image}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {user.name} {user.lastName}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {accountDescription}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {user.email}
          </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div
            role="button"
            key={index}
            onClick={() => HandleClick(item.title)}
            className=" flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >

            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className="outline text-xl rounded-lg p-3 hover:bg-light-gray"

            >
              {item.icon}
            </button>

            <div>
              <p className=" font-semibold dark:text-gray-200 ">{item.title}</p>
              {item.title === 'Log Out'}
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {" "}
                {item.desc}{" "}
              </p>
            </div>



          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;

