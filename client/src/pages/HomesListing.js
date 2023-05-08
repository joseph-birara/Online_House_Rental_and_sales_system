import { NavLink } from "react-router-dom";
import styles from "./HomesListing.module.css";
import ImageSlider from "../components/ImageSlider";
import { IoBedOutline, IoMagnet } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { AiOutlineHeart } from "react-icons/ai";
import Button from "../UI/Button";
import { useContext, useEffect } from "react";
import { UtilityContext } from "../contexts/UtilityContextProvide";

// import { getAllHouses } from "../services/http";
import axios from "axios";

export const Home = ({ home }) => {
  const img = {
    width: "100%",
    height: "15rem",
    borderRadius: "15px",
  };
  const sliderContainer = {
    width: "100%",
  };

  return (
    <NavLink className={styles.navLink} to="/homeDetails">
      <div className={styles.mainContainer}>
        <ImageSlider
          images={[
            {
              url: "https://a0.muscache.com/im/pictures/miso/Hosting-724143817754329250/original/90676927-d56e-4b14-9282-05bf84ec2a76.jpeg?im_w=720",
            },
            {
              url: "https://a0.muscache.com/im/pictures/miso/Hosting-724143817754329250/original/54ad4ca5-ee98-4a90-aca9-b03126501d7d.jpeg?im_w=720",
            },
            {
              url: "https://a0.muscache.com/im/pictures/miso/Hosting-724143817754329250/original/754318ab-175b-4433-83e8-32da9d3c0e1c.jpeg?im_w=720",
            },
            {
              url: "https://a0.muscache.com/im/pictures/3b2c7005-423f-4057-84dc-2e4d3893762e.jpg?im_w=720",
            },
            {
              url: "https://a0.muscache.com/im/pictures/bc6be349-11ab-4b34-a208-569b3e8bd1e5.jpg?im_w=720",
            },
          ]}
          autoplay={false}
          sliderContainer={sliderContainer}
          imgDim={img}
        />
        <p className={styles.shorten} id={styles.title}>
          House Title is placed here
        </p>
        <p className={styles.shorten} id={styles.location}>
          Kebele {home.kebele} Woreda {home.woreda}, {home.subCity}, {home.city}
        </p>
        <div className={styles.icons}>
          <p>
            <IoBedOutline id={styles.bed} /> {home.bedRoom}
          </p>
          <p>
            <FaShower id={styles.shower} /> {home.bathRoom}
          </p>
          <p>
            <TfiRulerAlt2 /> {home.area} m<sup>2</sup>
          </p>
        </div>
        <p id={styles.price}>ETB{home.price}/mo</p>
        <p id={styles.like}>
          <Button className={styles.likebtn}>
            <AiOutlineHeart />
          </Button>
          <span> No of Likes </span>
        </p>
      </div>
    </NavLink>
  );
};

// const homes = [
//   {
//     id: "017",
//     title: "Modern comfort and convenience elegantly appointed",
//     location:
//       "kolfe (Atena Tera), Ring Road, Aserasement, Kolfe Keranio, Addis\
//     Ababa, 182609, Ethiopia",
//     bedRoom: "3",
//     bathRoom: "2",
//     area: "500",
//     price: "4000000",
//     numOfLikes: "34",
//     homePics: [
//       {
//         url: "https://a0.muscache.com/im/pictures/miso/Hosting-724143817754329250/original/90676927-d56e-4b14-9282-05bf84ec2a76.jpeg?im_w=720",
//       },
//       {
//         url: "https://a0.muscache.com/im/pictures/miso/Hosting-724143817754329250/original/54ad4ca5-ee98-4a90-aca9-b03126501d7d.jpeg?im_w=720",
//       },
//       {
//         url: "https://a0.muscache.com/im/pictures/miso/Hosting-724143817754329250/original/754318ab-175b-4433-83e8-32da9d3c0e1c.jpeg?im_w=720",
//       },
//       {
//         url: "https://a0.muscache.com/im/pictures/3b2c7005-423f-4057-84dc-2e4d3893762e.jpg?im_w=720",
//       },
//       {
//         url: "https://a0.muscache.com/im/pictures/bc6be349-11ab-4b34-a208-569b3e8bd1e5.jpg?im_w=720",
//       },
//     ],
//   },
// ];

const HomesListing = () => {

  const { HousesList, setHousesList } = useContext(UtilityContext);

  useEffect(() => {

    axios.get('http://localhost:4000/houses/all')
      .then((response) => {
        setHousesList(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

  }, [setHousesList]);

  // console.log(HousesList);
  // HousesList.forEach((obj) => {
  //   console.log(obj.images[0]);
  // });

  return (
    <div className="flex gap-8 justify-start flex-wrap">
      {HousesList.map((house) => (
        <Home key={house._id} home={house} />
      ))}
    </div>
  );
};

export default HomesListing;



// [{"_id":"6454e406f675697038772377",
// "ownerID":"6425d6f31994e934861c41c9",
// "images":["1683284998172_Fotor_AI（2）.png"],
// "password":"String",
// "city":"String",
// "subCity":"String",
// "woreda":"String",
// "kebele":"String",
// "price":79878,
// "homeStatus":"String",
// "verified":false,
// "area":90,
// "HomeType":"String",
// "bedRoom":60,
// "bathRoom":90,
// "createdAt":"2023-05-05T11:09:58.400Z",
// "updatedAt":"2023-05-05T11:09:58.400Z",
// "__v":0}]