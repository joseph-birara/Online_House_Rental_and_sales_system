import React, { useState, useEffect, useContext } from "react";
import ImageGalleryDisplayer from "../components/ImageGalleryDisplayer";
import { CiLocationOn } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import styles from "./HomeDetails.module.css";
import HomeProperties from "../components/home/HomeProperties";
import AmenitiesDisplayer from "../components/home/AmenitiesDisplayer";
import Comments from "../components/comments/Comments";
import Dropdown from "../components/Dropdown";
import BookingWidget from "../components/BookingWidget";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { UtilityContext } from "../contexts/UtilityContextProvide";

const HomeDetails = ({ forAdmin }) => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const { HousesList } = useContext(UtilityContext);

  useEffect(() => {
    if (!id) {
      return;
    }
    const house = HousesList.filter((h) => h._id === id)[0];
    setPlace(house);
  }, [id, HousesList]);

  if (!place) return "";
  console.log(place);

  let homePics = [];
  for (let i = 0; i < place.images.length; i++) {
    homePics.push({ original: place.images[i], thumbnail: place.images[i] });
  }

  const dropdownSelectHandler = (action, placeId) => {
    console.log(action, placeId);
  };
  const actionOptions = [
    "Activate",
    "Deactivate",
    "Delete",
    "Verify",
    "Refute",
  ];

  return (
    <div className={styles.mainContainer}>
      {forAdmin && (
        <div className="flex justify-end">
          <Dropdown
            actions={actionOptions}
            onSelect={dropdownSelectHandler}
            //itemId={place._id}
          />
        </div>
      )}
      <div className={styles.innerContainer}>
        <h1>{place.title}</h1>
        <p>
          <CiLocationOn />
          {place.city} city, {place.subCity} subcity, {place.woreda} woreda,{" "}
          {place.kebele} kebele
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
              {place.ownerId.name} {place.ownerId.lastName}
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
          <p>{place.description}</p>
        </div>
        <BookingWidget place={place} />
      </div>
      <HomeProperties place={place} />
      <AmenitiesDisplayer amenities={place.amenity} />
      {!forAdmin && <Comments currentUserId="1" />}
    </div>
  );
};

export default HomeDetails;
