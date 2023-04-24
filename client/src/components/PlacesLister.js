import { Link, useParams } from "react-router-dom";
// import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
// import axios from "axios";
import PlaceImg from "./PlaceImg";
import Dropdown from "./Dropdown";
import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { TfiRulerAlt2 } from "react-icons/tfi";

export const _Home = ({ place, forAdmin }) => {
  const actionOptions = [
    "Activate",
    "Deactivate",
    "Delete",
    "Verify",
    "Refute",
  ];

  const dropdownSelectHandler = (action, placeId) => {
    console.log(action, placeId);
  };
  let linkUrl = "/account/places/" + place._id;
  if (forAdmin) {
    linkUrl = "/admin/homes/home" //+ place._id;
  }
  return (
    <Link
      to={linkUrl}
      className="flex justify-between items-center cursor-pointer gap-1 p-4 rounded-lg m-4"
      style={{boxShadow: "0 0 1px #091240"}}
    >
      <div className="flex w-32 h-32 bg-gray-300 shrink-0 mr-4">
        <PlaceImg place={place} />
      </div>
      <div className="grow-0 shrink">
        <h2 className="text-xl">{place.title}</h2>
        <p className="text-sm mt-2">{place.description}</p>
        <div className="flex justify-start gap-8">
          <p>
            <IoBedOutline /> {place.bedRoom}
          </p>
          <p>
            <FaShower  /> {place.bathRoom}
          </p>
          <p>
            <TfiRulerAlt2 /> {place.area}m<sup>2</sup>
          </p>
          <p>{place.homeType}</p>
        </div>
      </div>
      {forAdmin && (
        <div className="grow shrink-0">
          <Dropdown
            actions={actionOptions}
            onSelect={dropdownSelectHandler}
            itemId={place._id}
          />
        </div>
      )}
    </Link>
  );
};

function PlacesLister({ places, forAdmin }) {
  // const [places, setPlaces] = useState([]);
  //   useEffect(() => {
  //     axios.get("/user-places").then(({ data }) => {
  //       setPlaces(data);
  //     });
  //   }, []);

  return (
    <div className="mt-4">
      {places.length > 0 &&
        places.map((place) => (
          <_Home index={place._d} place={place} forAdmin={forAdmin} />
        ))}
    </div>
  );
}

export default PlacesLister;
