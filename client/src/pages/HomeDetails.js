import ImageGalleryDisplayer from "../components/ImageGalleryDisplayer";
import { CiLocationOn } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import styles from "./HomeDetails.module.css";
import HomeProperties from "../components/home/HomeProperties";
import AmenitiesDisplayer from "../components/home/AmenitiesDisplayer";
import Comments from "../components/comments/Comments";
import Dropdown from "../components/Dropdown";
import BookingWidget from "../components/BookingWidget";

const HomeDetails = ({ forAdmin }) => {
  const homePics = [
    {
      original:
        "https://a0.muscache.com/im/pictures/miso/Hosting-724143817754329250/original/90676927-d56e-4b14-9282-05bf84ec2a76.jpeg?im_w=720",
      thumbnail:
        "https://a0.muscache.com/im/pictures/miso/Hosting-724143817754329250/original/90676927-d56e-4b14-9282-05bf84ec2a76.jpeg?im_w=720",
    },
    {
      original:
        "https://a0.muscache.com/im/pictures/miso/Hosting-724143817754329250/original/54ad4ca5-ee98-4a90-aca9-b03126501d7d.jpeg?im_w=720",
      thumbnail:
        "https://a0.muscache.com/im/pictures/miso/Hosting-724143817754329250/original/54ad4ca5-ee98-4a90-aca9-b03126501d7d.jpeg?im_w=720",
    },
    {
      original:
        "https://a0.muscache.com/im/pictures/miso/Hosting-724143817754329250/original/754318ab-175b-4433-83e8-32da9d3c0e1c.jpeg?im_w=720",
      thumbnail:
        "https://a0.muscache.com/im/pictures/miso/Hosting-724143817754329250/original/754318ab-175b-4433-83e8-32da9d3c0e1c.jpeg?im_w=720",
    },
    {
      original:
        "https://a0.muscache.com/im/pictures/3b2c7005-423f-4057-84dc-2e4d3893762e.jpg?im_w=720",
      thumbnail:
        "https://a0.muscache.com/im/pictures/3b2c7005-423f-4057-84dc-2e4d3893762e.jpg?im_w=720",
    },
    {
      original:
        "https://a0.muscache.com/im/pictures/bc6be349-11ab-4b34-a208-569b3e8bd1e5.jpg?im_w=720",
      thumbnail:
        "https://a0.muscache.com/im/pictures/bc6be349-11ab-4b34-a208-569b3e8bd1e5.jpg?im_w=720",
    },
  ];
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

  const place = {
    _id: "0011",
    title: "Modern comfort and convenience elegantly appointed",
    location:
      "Atlas, Ghana Street, Ghiliffalegn Stream, Bole, AddisAbaba, 7966, Ethiopia",
    description:
      "Bole, House or Office for Rent, Addis Ababa. The total area is 500\
    square meters. It has living and dining room with working fire-place,\
    kitchen, master bedroom with it’s own bathroom, and two bedrooms with\
    common shower room. There are four service rooms with shower room,\
    garden and parking for 3 cars. The rate is 2,500 USD for residential\
    rent and 3,000 USD for office rent per month and fixed.",
    price: 250,
    homeType: "shortTerm"
  };
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
