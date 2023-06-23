import ImageGalleryDisplayer from "../components/ImageGalleryDisplayer";
import { useParams } from "react-router-dom";

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
import { UserContext } from "../contexts/UserContextProvider";

const HomeDetails = ({ forAdmin }) => {
  const { id } = useParams();
  const { HousesList } = useContext(UtilityContext);
  const { user } = useContext(UserContext);

  const getHouseById = (h_id) => {
    return HousesList.find((house) => house._id === h_id);
  };

  const specificHouse = getHouseById(id); // Replace
  const houseImages = specificHouse.images;
  const homePics = houseImages.map((image) => {
    return {
      original: image,
      thumbnail: image,
    };
  });

  return (
    <div className={styles.mainContainer}>
      <div className={styles.innerContainer}>
        <h1>{specificHouse.title}</h1>
        <p>
          <CiLocationOn />
          {specificHouse.woreda} {specificHouse.subCity} {specificHouse.city}{" "}
          {" Ethiopia"}
        </p>
        <div className={styles.reviewsAndOwnerContainer}>
          <div>
            <a href="#">6 reviews</a>
          </div>
          <div id={styles.owner}>
            <span>
              <IoPersonOutline /> Posted by:
            </span>
            <a href="#">
              {" "}
              {specificHouse.ownerId.name} {specificHouse.ownerId.lastName}{" "}
            </a>
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
          <p>{specificHouse.description}</p>
        </div>
        {/* {user && (user.userTye === 'tenant' || user.userTye === 'buyer') && <BookingWidget place={specificHouse} />} */}
        {user && (user.userType === 'tenant' || user.userType === 'buyer') && <BookingWidget place={specificHouse} />}

      </div>
      <HomeProperties specificHouse={specificHouse} />
      <AmenitiesDisplayer amenities={specificHouse.amenity} />
      {!forAdmin && (
        <Comments
          houseId={specificHouse._id}
          ownerId={specificHouse.ownerId._id}
        />
      )}
    </div>
  );
};

export default HomeDetails;
