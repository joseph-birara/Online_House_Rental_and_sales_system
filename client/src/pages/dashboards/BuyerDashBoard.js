import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import userProfPic from "./avatar.jpg";
import { BsCurrencyDollar } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";

const BuyerDashBoard = () => {
  const sidebarLinks = [

    {
      title: "Applications",
      links: [
        {
          name: "View Applications",
          link: "buyer/applications",
          icon: <FiShoppingBag />,
        },
      ],
    }

  ];
  const notificationData = [
  ];
  const userProfileData = [
    {
      icon: <BsCurrencyDollar />,
      title: "My Profile",
      desc: "Account Settings",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
    }
  ];
  return (
    <Dashboard
      sidebarLinks={sidebarLinks}
      notificationData={notificationData}
      userProfileData={userProfileData}
      userProfPic={userProfPic}
    />
  );
};

export default BuyerDashBoard;
