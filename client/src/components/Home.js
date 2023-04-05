import { NavLink } from "react-router-dom";
import styles from "./Home.module.css";
import ImageSlider from "./ImageSlider";
import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { AiOutlineHeart } from "react-icons/ai";
import Button from "../UI/Button";

const Home = () => {
  const homePics = [
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
  ];

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
          images={homePics}
          autoplay={false}
          sliderContainer={sliderContainer}
          imgDim={img}
        />
        <p className={styles.shorten} id={styles.title}>
          Modern comfort and convenience elegantly appointed
        </p>
        <p className={styles.shorten} id={styles.location}>
          kolfe (Atena Tera), Ring Road, Aserasement, Kolfe Keranio, Addis
          Ababa, 182609, Ethiopia
        </p>
        <div className={styles.icons}>
          <p>
            <IoBedOutline id={styles.bed} /> 3
          </p>
          <p>
            <FaShower id={styles.shower} /> 2
          </p>
          <p>
            <TfiRulerAlt2 /> 600 m<sup>2</sup>
          </p>
        </div>
        <p id={styles.price}>ETB20000/mo</p>
        <p id={styles.like}>
          <Button className={styles.likebtn}>
            <AiOutlineHeart />
          </Button>
          <span>33</span>
        </p>
      </div>
    </NavLink>
  );
};

export default Home;
