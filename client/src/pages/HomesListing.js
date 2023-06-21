import { NavLink } from "react-router-dom";
import styles from "./HomesListing.module.css";
import ImageSlider from "../components/ImageSlider";
import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { AiOutlineHeart } from "react-icons/ai";
import Button from "../UI/Button";
import { useContext, useEffect } from "react";
import { UtilityContext } from "../contexts/UtilityContextProvide";
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

  const pupulatedImagesObject = home.images.map((item) => {
    return {
      url: item,
    };
  });
  return (
    <div className={styles.mainContainer}>
      <ImageSlider
        images={pupulatedImagesObject}
        autoplay={false}
        sliderContainer={sliderContainer}
        imgDim={img}
      />
      <p className={styles.shorten} id={styles.title}>
        {home.title}
      </p>
      <p className={styles.shorten} id={styles.location}>
        {home.kebele}, {home.woreda}, {home.subCity}, {home.city}
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
      <div className="font-semibold mx-3 border border-[lightgray] flex justify-between gap-1 items-center p-0.5 ">
        <p className=""> ETB {home.price}/month</p>

        <p className="border border-[red] px-1">
          <Button className="transform scale-150 " >
            <AiOutlineHeart />
          </Button>
          <span> Likes</span>
        </p>
      </div>

    </div>
  );
};

const HomesListing = () => {

  const { HousesList, setHousesList } = useContext(UtilityContext);

  useEffect(() => {
    axios.get('http://localhost:4000/houses/all')
      .then((response) => {
        console.log(response.data);
        setHousesList(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

  }, [HousesList]);

  return (
    <div className="mx-2 p-2 flex gap-4 justify-start flex-wrap">
      {HousesList.map((house) => (
        house.homeType !== 'sale' && !house.isRented && < NavLink className={styles.navLink} to={`/homeDetails/${house._id}`}>
          <Home key={house._id} home={house} />
        </NavLink>

      ))}
    </div >
  );
};

export default HomesListing;