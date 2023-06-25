import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import Dropdown from "./Dropdown";
import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { UserContext } from "../contexts/UserContextProvider";
import axios from "axios";
import { UtilityContext } from "../contexts/UtilityContextProvide";

export const H_HOME = ({ house, forAdmin }) => {
  const { user, token } = useContext(UserContext);
  const { HousesList, setHousesList } = useContext(UtilityContext);
  const actionOptions = [
    "Activate",
    "Deactivate",
    "Delete",
    "Verify",
    "Refute",
  ];

  const dropdownSelectHandler = (action, houseId) => {
    // console.log(action, houseId);
  };
  let linkUrl = "/homeOwner/homes/onListing/" + house._id;
  if (forAdmin) {
    linkUrl = "/homes/home" + house._id;
  }

  return (
    <Link
      to={linkUrl}
      className="flex justify-between items-center cursor-pointer gap-1 p-4 rounded-lg m-4"
      style={{ boxShadow: "0 0 1px #091240" }}
    >
      <div className="flex w-32 h-32 bg-gray-300 shrink-0 mr-2 ">
        <img className="rounded-lg" src={house.images[0]} alt="" />
      </div>
      <div className="grow-0 shrink px-1">
        <h2 className="text-xl">{house.title}</h2>
        <p className="text-sm mt-2 line-clamp-2">{house.description}</p>
        <div className="flex justify-start gap-8">
          <p>
            <IoBedOutline /> {house.bedRoom}
          </p>
          <p>
            <FaShower /> {house.bathRoom}
          </p>
          <p>
            <TfiRulerAlt2 /> {house.area}m<sup>2</sup>
          </p>
          <p>{house.homeType}</p>

          <p className={`text-sm font-medium ${house.verified ? 'text-[green]' : 'text-[red]'} `}>Verified</p>
          <p className={`text-sm font-medium ${house.suspended ? "text-[green]" : "text-[red]"} `}> Suspended</p>
        </div>
      </div>
      {forAdmin && (
        <div className="grow shrink-0">
          <Dropdown
            actions={actionOptions}
            onSelect={dropdownSelectHandler}
            itemId={house._id}
          />
        </div>
      )}

      {user.userType === "owner" && (
        <button
          className="grow w-2/12 shrink-0 ] ml-3 mr-1 bg-[red] text-lg text-white py-1 rounded"
          onClick={(e) => {
            e.preventDefault();
            console.log("the id to be delted is ");
            console.log(house._id);
            axios
              .delete(
                `${process.env.REACT_APP_baseURL}/houses/delete/${house._id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((response) => {
                const filteredHomes = HousesList.filter(
                  (h) => h._id !== house._id
                );
                setHousesList(filteredHomes);
                console.log("home deleted succesfuly");
                return <Navigate to={"/homeOwner/homes/onListing"} />;
              })
              .catch((error) => {
                console.log("Error on deleting house");
                console.log(error.message);
              });
          }}
        >
          Delete Home
        </button>
      )}
    </Link>
  );
};

function PlacesLister({ houses }) {
  const { user } = useContext(UserContext);
  return (
    <div className="mt-4">
      {houses.map((house, index) => (
        <H_HOME
          key={house._id}
          house={house}
          forAdmin={user.userType === "admin"}
        />
      ))}
    </div>
  )
}

export default PlacesLister;
