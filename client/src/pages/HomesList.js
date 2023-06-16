import React from "react";
import PlacesLister from "../components/PlacesLister";
import { useContext } from "react";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import { UserContext } from "../contexts/UserContextProvider";


const HomesList = ({ rented }) => {

  /// use this list of homes and take these to display these
  const { HousesList } = useContext(UtilityContext)
  const { user } = useContext(UserContext)


  if (rented && user.userType === 'owner') {

    let homeLists = HousesList.filter(house => {
      return house.ownerId._id === user._id && house.isRented === true
    })

    console.log('ower is clikded to view al homes --- rented is clicked');
    console.log(homeLists);
    // for owner and rented
    return (
      <>
        <p className="text-xl font-semibold mx-4 mb-8 pb-4 border-b-1 border-[#7dd3fc]">
          List of homes
        </p>
        <PlacesLister houses={homeLists} />
      </>
    )

  } else if (rented && user.userType === 'admin') {
    let homeLists = HousesList.filter(house => house.isRented === true)

    // for admin rented
    return (
      <>
        <p className="text-xl font-semibold mx-4 mb-8 pb-4 border-b-1 border-[#7dd3fc]">
          List of homes
        </p>
        <PlacesLister houses={homeLists} />
      </>
    )


  } else if (user.userType === 'admin') {

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
  else if (user.userType === 'owner') {
    const homeLists = HousesList.filter(house => house.ownerId._id === user._id
    )

    console.log('ower is clikded to view homes --- here are the list');
    console.log(homeLists);
    // for owner list of homes
    return (
      <>
        <p className="text-xl font-semibold mx-4 mb-8 pb-4 border-b-1 border-[#7dd3fc]">
          List of homes
        </p>
        <PlacesLister houses={homeLists} />
      </>
    )

  }

};

export default HomesList;