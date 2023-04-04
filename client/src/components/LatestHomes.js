import classes from "./LatestHomes.module.css";
import f1 from "./featured1.jpg";
import f2 from "./featured2.jpg";
import f3 from "./featured3.jpg";
import f4 from "./featured4.jpg";
import Button from "../UI/Button";

const LatestHomes = ({ forRent }) => {
  const exploreHandler = () => {};
  return (
    <div className={classes.mainContainer}>
      <div>
        <p>
          Featured <span>_______</span>
        </p>
        <p id={classes.saleRentText}>
          Latest houses for {`${forRent ? "rent" : "sale"}`}
        </p>
      </div>

      <div className={classes.imagesContainer}>
        <div className={classes.img}>
          <img src={f1} className={classes.homePic} />
        </div>

        <div className={classes.img}>
          <img src={f2} className={classes.homePic} />
        </div>

        <div className={classes.img}>
          <img src={f3} className={classes.homePic} />
        </div>
        <div className={classes.img}>
          <img src={f4} className={classes.homePic} />
        </div>
      </div>

      <div className={classes.btnContainer}>
      <Button className={classes.exploreBtn} onClick={exploreHandler}>
        Explore All
      </Button>
      </div>
    </div>
  );
};

export default LatestHomes;
