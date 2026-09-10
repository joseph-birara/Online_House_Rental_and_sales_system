import classes from "./LatestHomes.module.css";
import f1 from "./images/featured1.jpg";
import f2 from "./images/featured2.jpg";
import f3 from "./images/featured3.jpg";
import f4 from "./images/featured4.jpg";
import Button from "../../UI/Button";
import { Link } from "react-router-dom";

const LatestHomes = ({ forRent }) => {
  const exploreHandler = () => { };
  const homes = [
    { src: f1, label: "Featured home" },
    { src: f2, label: "Featured home" },
    { src: f3, label: "Featured home" },
    { src: f4, label: "Featured home" },
  ];

  return (
    <div className={classes.mainContainer}>
      <div className={classes.heading}>
        <p>
          Featured
        </p>
        <p id={classes.saleRentText}>
          Latest houses for {`${forRent ? "rent" : "sale"}`}
        </p>
      </div>

      <div className={classes.imagesContainer}>
        {homes.map((home) => (
          <div className={classes.img} key={home.src}>
            <img src={home.src} className={classes.homePic} alt="" />
            <div className={classes.cardMeta}>
              <span>{forRent ? "For rent" : "For sale"}</span>
              <p>{home.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={classes.btnContainer}>
        <Link
        to={forRent?"/rent":"/buy"}>
          <Button className={classes.exploreBtn} onClick={exploreHandler}>
            Explore all
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LatestHomes;
