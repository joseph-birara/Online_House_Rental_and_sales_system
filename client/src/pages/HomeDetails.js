import ImageGalleryDisplayer from "../components/ImageGalleryDisplayer";
import { useParams } from 'react-router-dom';

import { CiLocationOn } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import styles from "./HomeDetails.module.css";
import HomeProperties from "../components/home/HomeProperties";
import AmenitiesDisplayer from "../components/home/AmenitiesDisplayer";
import Comments from "../components/comments/Comments";
// import Dropdown from "../components/Dropdown";
import BookingWidget from "../components/BookingWidget";
import { useContext } from "react";
import { UtilityContext } from "../contexts/UtilityContextProvide";

const HomeDetails = ({ forAdmin }) => {
  const { id } = useParams();
  const { HousesList } = useContext(UtilityContext)


  const getHouseById = (h_id) => {
    return HousesList.find((house) => house._id === h_id);
  };

  // Usage example
  const specificHouse = getHouseById(id); // Replace 
  const houseImages = specificHouse.images
  const homePics = houseImages.map((image) => {
    return {
      original: image,
      thumbnail: image,
    };
  });
  // const dropdownSelectHandler = (action, placeId) => {
  //   console.log(action, placeId);
  // };
  // const actionOptions = [
  //   "Activate",
  //   "Deactivate",
  //   "Delete",
  //   "Verify",
  //   "Refute",
  // ];

  const place = {
    _id: "0011",
    title: "Modern comfort and convenience elegantly appointed",
    location: "Atlas, Ghana Street, Ghiliffalegn Stream, Bole, AddisAbaba, 7966, Ethiopia",
    description: "Bole, House or Office for Rent, Addis Ababa. The total area is 500 square meters. It has living and dining room with working fire-place, kitchen, master bedroom with it’s own bathroom, and two bedrooms with common shower room. There are four service rooms with shower room, garden and parking for 3 cars. The rate is 2,500 USD for residential rent and 3,000 USD for office rent per month and fixed.",
    price: 250,
    homeType: "shortTerm"
  };
  return (
    <div className={styles.mainContainer}>
      {/* {forAdmin && (
        <div className="flex justify-end">
          <Dropdown
            actions={actionOptions}
            onSelect={dropdownSelectHandler}
          //itemId={place._id}
          />
        </div>
      )} */}
      <div className={styles.innerContainer}>
        <h1>{place.title}</h1>
        <p>
          <CiLocationOn />
          {place.location}
        </p>
        <div className={styles.reviewsAndOwnerContainer}>
          <div>
            <a href="#">6 reviews</a>
          </div>
          <div id={styles.owner}>
            <span>
              <IoPersonOutline /> Posted by:
            </span>
            <a href="#">Haile Kebede</a>
          </div>
        </div>
      </div>
      <ImageGalleryDisplayer
        className={styles.galleryContainer}
        images={homePics}
      />
      <div className="flex items-baseline gap-2 mt-16">
        <div className={styles.description}>
          <div className={styles.descriptionTitle}>
            <h2>Description</h2>
          </div>
          <p>{place.description}</p>
        </div>
        <BookingWidget place={place} />
      </div>
      <HomeProperties />
      <AmenitiesDisplayer />
      {!forAdmin && <Comments currentUserId="1" />}
    </div>
  );
};

export default HomeDetails;
