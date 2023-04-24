import React from "react";
import UsersLister from "../components/UsersLister";

const UsersersList = ({ userType, removeDropdown }) => {
  const homeOwnersList = [
    {
      _id: "0010",
      image:
        "https://media.istockphoto.com/id/646876580/photo/portrait-of-a-real-crying-man.jpg?s=170667a&w=0&k=20&c=598aY-zEfjylRzqwSdIu0gmE9uYMPwPyTnaf1VTfC4I=",
      name: "Yotor",
      lastName: "Feleke",
      email: "yotor@gmail.com",
      accountStatus: "active",
    },
    {
      _id: "0011",
      image:
        "https://media.istockphoto.com/id/646876580/photo/portrait-of-a-real-crying-man.jpg?s=170667a&w=0&k=20&c=598aY-zEfjylRzqwSdIu0gmE9uYMPwPyTnaf1VTfC4I=",
      name: "Haile",
      lastName: "Feleke",
      email: "yotor@gmail.com",
      accountStatus: "active",
    },
    {
      _id: "0012",
      image:
        "https://media.istockphoto.com/id/646876580/photo/portrait-of-a-real-crying-man.jpg?s=170667a&w=0&k=20&c=598aY-zEfjylRzqwSdIu0gmE9uYMPwPyTnaf1VTfC4I=",
      name: "Tom",
      lastName: "Feleke",
      email: "yotor@gmail.com",
      accountStatus: "active",
    },
  ];
  const selectHandler = (userId, userType, action) => {
    console.log(userId, userType, action);
  };
  if (Boolean(userType) === false) {
    userType = "homeowner";
  }
  let _userType = "Homeowners";

  switch (userType) {
    case "tenant":
      _userType = "Tenants";
      break;
    case "buyer":
      _userType = "Buyers";
      break;
    case "tenant/plain":
      _userType = "Your tenants";
      break;
    case "applicant":
      _userType = "Applicants";
  }

  return (
    <>
      <p className="text-xl font-semibold mx-4 mb-8 pb-4 border-b-1 border-[#7dd3fc]">
        {_userType}
      </p>
      <UsersLister
        userType={userType}
        users={homeOwnersList}
        removeDropdown={removeDropdown}
        dropdownSelectHandler={selectHandler}
      />
    </>
  );
};

export default UsersersList;
