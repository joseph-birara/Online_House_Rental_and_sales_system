import { Link, useParams } from "react-router-dom";
// import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
// import axios from "axios";
import PlaceImg from "./PlaceImg";

export const _Home = ({ place }) => {
  return (
    <Link
      to={"/account/places/" + place._id}
      className="flex cursor-pointer gap-4 bg-lightBlue p-4 rounded-2xl"
    >
      <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
        <PlaceImg place={place} />
      </div>
      <div className="grow-0 shrink">
        <h2 className="text-xl">{place.title}</h2>
        <p className="text-sm mt-2">{place.description}</p>
      </div>
    </Link>
  );
};

function PlacesLister({places}) {
  // const [places, setPlaces] = useState([]);
  //   useEffect(() => {
  //     axios.get("/user-places").then(({ data }) => {
  //       setPlaces(data);
  //     });
  //   }, []);


  return (
      <div className="mt-4">
        {places.length > 0 && places.map((place) => <_Home place={place} />)}
      </div>
  );
}

export default PlacesLister;
