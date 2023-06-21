import React from "react";
// import PlaceImg from "../components/PlaceImg";
import { Link } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import PlacesLister from "../components/PlacesLister";

const user = {
  _id: "0010",
  image:
    "https://media.istockphoto.com/id/646876580/photo/portrait-of-a-real-crying-man.jpg?s=170667a&w=0&k=20&c=598aY-zEfjylRzqwSdIu0gmE9uYMPwPyTnaf1VTfC4I=",
  name: "Yotor",
  lastName: "Feleke",
  email: "yotor@gmail.com",
  accountStatus: "active",
  city: "Addis Ababa",
  subCity: "Arada",
  woreda: "Seba Dereja",
  kebele: "14",
  phone: "0910203040",
  homes: [
    {
      bedRoom: 3,
      bathRoom: 2,
      area: "500",
      _id: "0000001",
      title: "The cottages of the old resort * ***- Swimming pool",
      description:
        "Aline and Vincent welcome you all year round in their three cottages (ranked 4 stars ) with swimming pool in the charming village of Warnécourt located in the countryside in the heart of the Ardennes.",
      photos: [
        "https://a0.muscache.com/im/pictures/miso/Hosting-52724927/original/baf41981-55f0-4114-99e3-e16f2417f8c2.jpeg?im_w=720",
      ],
      currStatus: "onListing",
      homeType: "sale",
    },
    {
      bedRoom: 3,
      bathRoom: 2,
      area: "500",
      _id: "0000002",
      title: "The miracles of the old resort * ***- Swimming pool",
      description:
        "Javeline and Cathy welcome you all year round in their three cottages (ranked 4 stars ) with swimming pool in the charming village of Warnécourt located in the countryside in the heart of the Ardennes.",
      photos: [
        "https://a0.muscache.com/im/pictures/miso/Hosting-52724927/original/baf41981-55f0-4114-99e3-e16f2417f8c2.jpeg?im_w=720",
      ],
      currStatus: "rented",
      homeType: "rent",
    },
  ],
};

const DetailsPage = () => {
  return (
    <>
      {/* Display User */}

      <div className="mx-10 mb-10 ">
        <h1> The detail page and should access the global context </h1>
        <h1> But it is using hardcoded data</h1>
        {/** user deatil container */}
        <div className="bg-white  rounded-lg shadow-xl">
          {/* for profile header */}

          <div className="h-28 flex justify-between items-center">
            <img
              src={user.image}
              alt={user.name}
              className="w-20 h-20 ml-5 rounded-full object-cover"
            />

            <div className="flex-1 ml-4">
              <p className="text-2xl font-bold">
                {user.name} {user.lastName}
              </p>
            </div>

            <div className="w-1/8"></div>
          </div>

          {/*for detail part */}
          <div className="mx-auto p-6 flex flex-col">
            <div className="flex justify-between mb-4">
              <div className="w-1/2">
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="text-lg font-semibold">{`${user.name} ${user.lastName}`}</p>
              </div>

              <div className="w-1/2">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>
            </div>

            <div className="mb-3 rounded-lg p-2 pl-0 w-fit">
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="text-lg font-semibold">{` woreda /${user.subCity}/${user.city}`}</p>
            </div>

            <div className="flex justify-between flex-wrap gap-y-4 overflow-x-auto mb-8">
              <div className="w-1/2 pr-4">
                <p className="text-sm font-medium text-gray-500">City</p>
                <p className="text-lg font-semibold"> {user.city}</p>
              </div>
              <div className="w-1/2 pr-4">
                <p className="text-sm font-medium text-gray-500">Subcity</p>
                <p className="text-lg font-semibold">{user.subCity}</p>
              </div>
              <div className="w-1/2 pr-4">
                <p className="text-sm font-medium text-gray-500">Woreda</p>
                <p className="text-lg font-semibold">{user.woreda}</p>
              </div>
              <div className="w-1/2 pr-4">
                <p className="text-sm font-medium text-gray-500">Kebele</p>
                <p className="text-lg font-semibold">{user.kebele}</p>
              </div>
            </div>

            <div className="">
              <p className="text-sm font-medium text-gray-500">Phone number</p>
              <p className="text-lg font-semibold">{user.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Display List of homes*/}
      <div className=" mx-10 rounded-lg shadow-lg bg-white">
        <div className="text-2xl font-bold p-4 "> List of Homes</div>
        <PlacesLister places={user.homes} forAdmin={true} />
      </div>
    </>
  );
};

export default DetailsPage;
