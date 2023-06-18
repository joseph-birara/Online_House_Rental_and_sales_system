import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import userProfPic from "./avatar.jpg";
import { BsCurrencyDollar, BsShield } from "react-icons/bs";
import { FiShoppingBag, FiCreditCard } from "react-icons/fi";
import { AiOutlineCalendar } from "react-icons/ai";
import { RiContactsLine } from "react-icons/ri";

const TenantDashboard = () => {
  const sidebarLinks = [
    {
      title: "Applications",
      links: [
        {
          name: "View Applications",
          link: "tenant/applications",
          icon: <FiShoppingBag />,
        },
      ],
    },
    {
      title: "Maintenance Requests",
      links: [
        {
          name: "View Maintenance Requests",
          link: "tenant/mRequests",
          icon: <RiContactsLine />,
        },
        {
            name: "New Maintenance Request",
            link: "tenant/mRequests/new",
            icon: <RiContactsLine />,
          },
      ],
    },
    
  ];
  const notificationData = [
    {
      image: userProfPic,
      message: "Roman Joined the Team!",
      desc: "Congratulate him",
      time: "9:08 AM",
    },
    {
      image: userProfPic,
      message: "New message received",
      desc: "Salma sent you new message",
      time: "11:56 AM",
    },
    {
      image: userProfPic,
      message: "New Payment received",
      desc: "Check your earnings",
      time: "4:39 AM",
    },
    {
      image: userProfPic,
      message: "Jolly completed tasks",
      desc: "Assign her new tasks",
      time: "1:12 AM",
    },
  ];
  const userProfileData = [
    {
      icon: <BsCurrencyDollar />,
      title: "My Profile",
      desc: "Account Settings",
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
      icon: <FiCreditCard />,
      title: "My Tasks",
      desc: "To-do and Daily Tasks",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
    },
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

export default TenantDashboard;
