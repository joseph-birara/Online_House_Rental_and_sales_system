import React from "react";
import PlacesLister from "../components/PlacesLister";
const userId = "12";
const places = [
  {
    bedRoom: 3,
    bathRoom: 2,
    area: "500",
    homeType: "rent",
    _id: "0000001",
    ownerId: "12",

    title: "The cottages of the old resort * ***- Swimming pool",
    description:
      "Aline and Vincent welcome you all year round in their three cottages (ranked 4 stars ) with swimming pool in the charming village of Warnécourt located in the countryside in the heart of the Ardennes.",
    photos: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-52724927/original/baf41981-55f0-4114-99e3-e16f2417f8c2.jpeg?im_w=720",
    ],
    currStatus: "onListing",
  },
  {
    bedRoom: 3,
    bathRoom: 2,
    area: "500",
    homeType: "sale",
    _id: "0000002",
    ownerId: "12",
    title: "The miracles of the old resort * ***- Swimming pool",
    description:
      "Javeline and Cathy welcome you all year round in their three cottages (ranked 4 stars ) with swimming pool in the charming village of Warnécourt located in the countryside in the heart of the Ardennes.",
    photos: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-52724927/original/baf41981-55f0-4114-99e3-e16f2417f8c2.jpeg?im_w=720",
    ],
    currStatus: "rented",
  },
  {
    bedRoom: 3,
    bathRoom: 2,
    area: "500",
    homeType: "rent",
    _id: "0000003",
    ownerId: "13",

    title: "The cottages2 of the old resort * ***- Swimming pool",
    description:
      "Aline and Vincent welcome you all year round in their three cottages (ranked 4 stars ) with swimming pool in the charming village of Warnécourt located in the countryside in the heart of the Ardennes.",
    photos: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-52724927/original/baf41981-55f0-4114-99e3-e16f2417f8c2.jpeg?im_w=720",
    ],
    currStatus: "onListing",
  },
  {
    bedRoom: 3,
    bathRoom: 2,
    area: "500",
    homeType: "rent",
    _id: "0000004",
    ownerId: "13",
    title: "The miracles2 of the old resort * ***- Swimming pool",
    description:
      "Javeline and Cathy welcome you all year round in their three cottages (ranked 4 stars ) with swimming pool in the charming village of Warnécourt located in the countryside in the heart of the Ardennes.",
    photos: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-52724927/original/baf41981-55f0-4114-99e3-e16f2417f8c2.jpeg?im_w=720",
    ],
    currStatus: "rented",
  },
  {
    bedRoom: 3,
    bathRoom: 2,
    area: "500",
    homeType: "rent",
    _id: "0000005",
    ownerId: "12",

    title: "The cottages3 of the old resort * ***- Swimming pool",
    description:
      "Aline and Vincent welcome you all year round in their three cottages (ranked 4 stars ) with swimming pool in the charming village of Warnécourt located in the countryside in the heart of the Ardennes.",
    photos: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-52724927/original/baf41981-55f0-4114-99e3-e16f2417f8c2.jpeg?im_w=720",
    ],
    currStatus: "onListing",
  },
  {
    bedRoom: 3,
    bathRoom: 2,
    area: "500",
    homeType: "rent",
    _id: "0000006",
    ownerId: "12",
    title: "The miracles3 of the old resort * ***- Swimming pool",
    description:
      "Javeline and Cathy welcome you all year round in their three cottages (ranked 4 stars ) with swimming pool in the charming village of Warnécourt located in the countryside in the heart of the Ardennes.",
    photos: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-52724927/original/baf41981-55f0-4114-99e3-e16f2417f8c2.jpeg?im_w=720",
    ],
    currStatus: "rented",
  },
];

let rentedPlaces = places.filter((place) => place.currStatus === "rented");
let onListingPlaces = places.filter(
  (place) => place.currStatus === "onListing"
);

const HomesList = ({ rented, forAdmin }) => {
  forAdmin = Boolean(forAdmin);
  if (forAdmin == false) {
    rentedPlaces = rentedPlaces.filter((place) => place.ownerId === userId);
    onListingPlaces = onListingPlaces.filter(
      (place) => place.ownerId === userId
    );
  }
  if (rented) {
    return (
      <>
        {!forAdmin && (
          <p className="text-xl font-semibold mx-4 mb-8 pb-4 border-b-1 border-[#7dd3fc]">
            Homes you rented
          </p>
        )}
        <PlacesLister places={rentedPlaces} forAdmin={forAdmin} />
      </>
    );
  }

  return (
    <>
      {!forAdmin && (
        <p className="text-xl font-semibold mx-4 mb-8 pb-4 border-b-1 border-[#7dd3fc]">
          Homes you added
        </p>
      )}
      <PlacesLister places={onListingPlaces} forAdmin={forAdmin} />
    </>
  );
};

export default HomesList;
