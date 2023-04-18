import classes from "./LandingPage.module.css";
import img1 from "./images/hp1.jpg";
import img2 from "./images/hp7.jpg";
import img3 from "./images/hp4.webp";
import img4 from "./images/hp6.jpg";
import img5 from "./images/hp5.webp";
import img6 from "./images/hp3.webp";
import LatestHomes from "../components/home/LatestHomes";
import ImageSlider from "../components/ImageSlider";

const LandingPage = () => {

  const img = {
    width: "100%",
    height: "85vh",
  };
  const sliderContainer = {
    width: "98%",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const images = [
    { url:  img1},
    { url: img2 },
    { url: img3 },
    { url: img4 },
    { url: img5 },
    { url: img6 },
  ];
  return (
    <>
      <ImageSlider images={images} sliderContainer={sliderContainer} imgDim={img} autoplay={true} duration={2000}/>
      <div className={classes.moto}>
        <h1>Find your perfect home with Homiee!</h1>
        <p>We provide a complete service for sale, purchase, or rental of homes in Ethiopia!</p>
      </div>

      <LatestHomes forRent={true}/>
      <LatestHomes />
      
    </>
  );
};

export default LandingPage;
