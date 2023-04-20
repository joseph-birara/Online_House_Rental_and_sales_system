import React from "react";
import PlacesLister from "../../components/PlacesLister";
const places = [
  {
    _id: "0000001",
    title: "The cottages of the old resort * ***- Swimming pool",
    description:
      "Aline and Vincent welcome you all year round in their three cottages (ranked 4 stars ) with swimming pool in the charming village of Warnécourt located in the countryside in the heart of the Ardennes.",
    photos: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-52724927/original/baf41981-55f0-4114-99e3-e16f2417f8c2.jpeg?im_w=720",
    ],
    currStatus: "onListing",
  },
  {
    _id: "0000002",
    title: "The miracles of the old resort * ***- Swimming pool",
    description:
      "Javeline and Cathy welcome you all year round in their three cottages (ranked 4 stars ) with swimming pool in the charming village of Warnécourt located in the countryside in the heart of the Ardennes.",
    photos: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-52724927/original/baf41981-55f0-4114-99e3-e16f2417f8c2.jpeg?im_w=720",
    ],
    currStatus: "rented",
  },
];

const rentedPlaces = places.filter((place) => place.currStatus === "rented");
const onListingPlaces = places.filter(
  (place) => place.currStatus === "onListing"
);

const HomesListForOwner = ({ rented }) => {
  if (rented) {
    return <PlacesLister places={rentedPlaces} />;
  }

  return <PlacesLister places={onListingPlaces} />;
};

export default HomesListForOwner;
