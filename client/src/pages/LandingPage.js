import { Link } from "react-router-dom";
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
    height: "100%",
    objectFit: "cover",
  };
  const sliderContainer = {
    width: "100%",
    height: "100%",
  };

  const images = [
    { url: img1 },
    { url: img2 },
    { url: img3 },
    { url: img4 },
    { url: img5 },
    { url: img6 },
  ];

  return (
    <>
      <section className={classes.hero}>
        <ImageSlider images={images} sliderContainer={sliderContainer} imgDim={img} autoplay={true} duration={3500} />
        <div className={classes.heroOverlay}>
          <div className={classes.heroContent}>
            <p className={classes.eyebrow}>Homiee · Ethiopia</p>
            <h1>Find your perfect home with Homiee</h1>
            <p className={classes.heroCopy}>
              A complete service for sale, purchase, or rental of homes — designed to feel simple, calm, and trustworthy.
            </p>
            <div className={classes.heroActions}>
              <Link className={classes.primaryCta} to="/rent">Browse rentals</Link>
              <Link className={classes.secondaryCta} to="/buy">Homes for sale</Link>
            </div>
          </div>
        </div>
      </section>

      <section className={classes.highlights}>
        <div>
          <h3>Verified listings</h3>
          <p>Browse homes posted by homeowners across Ethiopia.</p>
        </div>
        <div>
          <h3>Rent or buy</h3>
          <p>One place for long-term rentals, short stays, and sales.</p>
        </div>
        <div>
          <h3>Simple applications</h3>
          <p>Create an account and apply or list a property in minutes.</p>
        </div>
      </section>

      <LatestHomes forRent={true} />
      <LatestHomes />

      <section className={classes.howItWorks}>
        <p className={classes.eyebrow}>How it works</p>
        <h2>Three steps to your next home</h2>
        <div className={classes.steps}>
          <article>
            <span>01</span>
            <h3>Create your account</h3>
            <p>Join as a homeowner, tenant, or buyer and set up your profile.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Browse or list</h3>
            <p>Explore featured homes, or publish your property for rent or sale.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Connect and close</h3>
            <p>Apply, review requests, and complete the deal with confidence.</p>
          </article>
        </div>
      </section>

      <section className={classes.bottomCta}>
        <div>
          <h2>Ready to list your property?</h2>
          <p>Join Homiee and reach tenants and buyers looking for their next home.</p>
        </div>
        <Link to="/register">Get started</Link>
      </section>
    </>
  );
};

export default LandingPage;
