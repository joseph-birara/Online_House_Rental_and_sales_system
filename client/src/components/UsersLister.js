import { Link, useParams } from "react-router-dom";
// import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
// import axios from "axios";
import Image from "./Image";
import Dropdown from "./Dropdown";

export const User = ({
  user,
  userType,
  dropdownSelectHandler,
  removeDropdown,
}) => {
  let actionOptions = ["Activate", "Deactivate", "Delete"];
  if (userType === "applicant") {
    actionOptions = ["Accept", "Reject"];
  }

  return (
    <Link
      to={"/admin/users/homeOwners/homeOwner"}
      className="flex justify-between items-center cursor-pointer gap-1 p-4 rounded-lg m-4"
      style={{ boxShadow: "0 0 1px #091240" }}
    >
      <div className="flex w-32 h-32 bg-gray-300 shrink-0">
        <Image src={user.image} />
      </div>
      <div className="grow shrink w-fit">
        <p>
          First Name:{" "}
          <span className="text-base font-semibold">{user.name}</span>
        </p>
        <p>
          Last Name:{" "}
          <span className="text-base font-semibold">{user.lastName}</span>
        </p>
      </div>
      <div className="grow shrink w-fit">
        <p>
          Email: <span className="text-base font-semibold">{user.email}</span>
        </p>
        <p>
          Acc. Status:{" "}
          <span className="text-base font-semibold">{user.accountStatus}</span>
        </p>
      </div>
      <div className="grow shrink w-fit">
        <p>
          City: <span className="text-base font-semibold">{user.name}</span>
        </p>
        <p>
          Subcity:{" "}
          <span className="text-base font-semibold">{user.lastName}</span>
        </p>
      </div>
      <div className="grow shrink w-fit">
        <p>
          Kebele: <span className="text-base font-semibold">{user.email}</span>
        </p>
        <p>
          Phone:{" "}
          <span className="text-base font-semibold">{user.accountStatus}</span>
        </p>
      </div>
      {!removeDropdown && (
        <div>
          <Dropdown
            actions={actionOptions}
            onSelect={dropdownSelectHandler}
            itemId={user._id}
            itemType={userType}
          />
        </div>
      )}
    </Link>
  );
};

function UsersLister({ userType, users, removeDropdown, dropdownSelectHandler }) {
  // const [places, setPlaces] = useState([]);
  //   useEffect(() => {
  //     axios.get("/user-places").then(({ data }) => {
  //       setPlaces(data);
  //     });
  //   }, []);

  return (
    <div className="mt-4">
      {users.length > 0 &&
        users.map((user) => (
          <User
            key={user._id}
            userType={userType}
            user={user}
            dropdownSelectHandler={dropdownSelectHandler}
            removeDropdown={removeDropdown}
          />
        ))}
    </div>
  );
}

export default UsersLister;
