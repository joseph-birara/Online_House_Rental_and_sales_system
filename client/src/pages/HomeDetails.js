import ImageGalleryDisplayer from "../components/ImageGalleryDisplayer";
import { useParams } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import styles from "./HomeDetails.module.css";
import HomeProperties from "../components/home/HomeProperties";
import AmenitiesDisplayer from "../components/home/AmenitiesDisplayer";
import Comments from "../components/comments/Comments";
import BookingWidget from "../components/BookingWidget";
import { useContext, useState } from "react";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import { UserContext } from "../contexts/UserContextProvider";
import axios from "axios";
import { useEffect } from "react";

const HomeDetails = ({ forAdmin }) => {
  const { id } = useParams();
  const { HousesList } = useContext(UtilityContext);
  const { user, token } = useContext(UserContext);

  // to show the number of reviews on this page, pass to child component and re-store it
  // in another state
  const [numberOfReviewsFromChildComponet, SetnumberOfReviewsFromChildComponet] = useState();
  const [countReview, setCountReviews] = useState(0)

  useEffect(() => {
    setCountReviews(numberOfReviewsFromChildComponet)
  }, [numberOfReviewsFromChildComponet])

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

  console.log("sp: ", specificHouse);
  const [isLiked, setIsLiked] = useState(specificHouse.like.includes(user._id));
  const [numOfLikes, setNumOfLikes] = useState(specificHouse.like.length);

  const likeHandler = () => {
    // console.log(isLiked, numOfLikes, specificHouse);
    if (isLiked) {
      specificHouse.like = specificHouse.like.filter((tenantId) => tenantId !== user._id)
      const houseUpdatedData = {
        id: specificHouse._id,
        like: specificHouse.like,
      };

      axios
        .put(
          `${process.env.REACT_APP_baseURL}/houses/update`,
          houseUpdatedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setIsLiked(false);
          setNumOfLikes((prev) => prev - 1);
          console.log("House updated successfully");
        })
        .catch((error) => {
          console.log("Error on updating House");
          console.log(error.message);
        });
    } else {
      specificHouse.like.push(user._id);

      const houseUpdatedData = {
        id: specificHouse._id,
        like: specificHouse.like,
      };

      axios
        .put(
          `${process.env.REACT_APP_baseURL}/houses/update`,
          houseUpdatedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setIsLiked(true);
          setNumOfLikes((prev) => prev + 1);
          console.log("House updated successfully");
        })
        .catch((error) => {
          console.log("Error on updating House");
          console.log(error.message);
        });
    }
  };

  // console.log(isLiked, numOfLikes);
  const heartStyle = isLiked ? "#1786fa" : "black";

  return (
    <div className={styles.mainContainer}>
      <div className={styles.innerContainer}>
        <h1>{specificHouse.title}</h1>


        <p>
          <CiLocationOn />
          {specificHouse.woreda} {specificHouse.subCity} {specificHouse.city}{" "}
          {" Ethiopia"}
        </p>

        {/*  review part*/}
        <div className={styles.reviewsAndOwnerContainer}>
          <div className="underline font-medium px-2">
            {countReview && countReview} reviews
          </div>

          <div id={styles.owner}>
            <span>
              <IoPersonOutline /> Posted by:
            </span>
            <span className="underline font-medium px-2">
              {specificHouse.ownerId.name} {specificHouse.ownerId.lastName}{" "}
            </span>
          </div>

          <button onClick={likeHandler} className={styles.likeBtn}>
            <svg
              stroke="currentColor"
              fill={heartStyle}
              stroke-width="0"
              viewBox="0 0 1024 1024"
              color="red"
              height="25"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "relative",
                top: "3"
              }}
            >
              <path d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z"></path>
            </svg>
            <span className="text-xl ml-1 mb-2 align-middle">{numOfLikes}</span>
          </button>
        </div>
      </div>

      {/* show homes images  */}
      <ImageGalleryDisplayer
        className={styles.galleryContainer}
        images={homePics}
      />

      {/* home description */}
      <div className="flex items-baseline gap-2 mt-16">
        <div className={styles.description}>
          <div className={styles.descriptionTitle}>
            <h2>Description</h2>
          </div>
          <p>{specificHouse.description}</p>
        </div>
        {/* {user && (user.userTye === 'tenant' || user.userTye === 'buyer') && <BookingWidget place={specificHouse} />} */}
        {user && (user.userType === "tenant" || user.userType === "buyer") && (
          <BookingWidget place={specificHouse} />
        )}
      </div>
      <HomeProperties specificHouse={specificHouse} />
      <AmenitiesDisplayer amenities={specificHouse.amenity} />

      {/* comment related */}
      {!forAdmin && specificHouse && specificHouse._id && (
        <Comments
          houseId={specificHouse._id}
          ownerId={specificHouse.ownerId._id}
          setNumeberOfReviews={SetnumberOfReviewsFromChildComponet}
        />
      )}
    </div>
  );
};

export default HomeDetails;
