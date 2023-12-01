import React, { useEffect } from "react";
import PlacesLister from "../components/PlacesLister";
import { useContext } from "react";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import { UserContext } from "../contexts/UserContextProvider";
import axios from "axios";
// import NoHomesAreAddedYet from "./NoHomesAreAddedYet";


const HomesList = ({ rented }) => {

  /// use this list of homes and take these to display these
  const { HousesList, setHousesList } = useContext(UtilityContext)
  const { user } = useContext(UserContext)

  useEffect(() => {

    // get all houses and set to the context
    axios.get('https://house-rental.onrender.com/houses/all')
      .then((response) => {
        // console.log("list of house is ");
        // console.log(response.data);
        console.log(HousesList);
        setHousesList(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  if (rented && user.userType === 'owner' && HousesList) {

    let homeLists = HousesList.filter(house => {
      return house.ownerId && house.ownerId._id && house.ownerId._id === user._id && house.isRented === true
    })

    console.log('ower is clikded to view al homes --- rented is clicked');
    console.log(homeLists);
    // for owner and rented
    return (
      <>
        <p className="text-xl font-semibold mx-4 mb-8 pb-4 border-b-1 border-[#7dd3fc]">
          List of Rented homes
        </p>
        <PlacesLister houses={homeLists} />
      </>
    )

  } else if (rented && user.userType === 'admin' && HousesList) {
    let homeLists = HousesList.filter(house => house.ownerId && house.ownerId._id && house.isRented === true)

    // for admin rented
    return (
      <>
        <p className="text-xl font-semibold mx-4 mb-8 pb-4 border-b-1 border-[#7dd3fc]">
          List of Rented homes
        </p>
        <PlacesLister houses={homeLists} />
      </>
    )
  } else if (user.userType === 'admin' && HousesList) {

    console.log("admin list all homes");
    // for admin all homes
    return (
      <>
        <p className="text-xl font-semibold mx-4 mb-8 pb-4 border-b-1 border-[#7dd3fc]">
          List of homes
        </p>
        <PlacesLister houses={HousesList} />
      </>
    )

  }
  else if (user.userType === 'owner' && HousesList) {
    let homeLists = HousesList.filter(house => house.ownerId && house.ownerId._id && house.ownerId._id === user._id && house.isRented !== true)

    console.log('ower is clikded to view homes --- here are the list');
    console.log(homeLists);
    // for owner list of homes
    return (
      <>
        <p className="text-xl font-semibold mx-4 mb-8 pb-4 border-b-1 border-[#7dd3fc]">
          List of Homes
        </p>
        <PlacesLister houses={homeLists} />
      </>
    )
  }
};

export default HomesList;