import { NavLink } from "react-router-dom";
import styles from "./HomesListing.module.css";
import ImageSlider from "../components/ImageSlider";
import ListingFilters from "../components/ListingFilters";
import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { AiOutlineHeart } from "react-icons/ai";
import { useContext } from "react";
import { NumberFormater } from "../services/HelperFunction";
import { UserContext } from "../contexts/UserContextProvider";
import { useHomesListing } from "../hooks/useHomesListing";

const FALLBACK_IMAGE =
  "https://res.cloudinary.com/dmegiw31y/image/upload/v1687634119/HomeRental/alt-image_rn3zbk.webp";

const listingBadge = (homeType) => {
  if (homeType === "regularRent") return "Monthly";
  if (homeType === "shortTermRent") return "Daily";
  if (homeType === "sale") return "For sale";
  return "Listing";
};

export const Home = ({ home }) => {
  const { user } = useContext(UserContext);
  const images = (home.images || []).filter(Boolean);
  const liked = Boolean(user?._id && home.like?.includes(user._id));
  const priceLabel =
    home.homeType === "regularRent"
      ? " /Month"
      : home.homeType === "shortTermRent"
        ? " /Day"
        : "";

  return (
    <div className={styles.mainContainer}>
      <div className={styles.imageWrap}>
        <span className={styles.badge}>{listingBadge(home.homeType)}</span>
        {images.length > 0 ? (
          <ImageSlider
            images={images.map((item) => ({ url: item }))}
            autoplay={false}
            sliderContainer={{ width: "100%" }}
            imgDim={{ width: "100%", height: "15rem", objectFit: "cover" }}
          />
        ) : (
          <img className={styles.placeholder} src={FALLBACK_IMAGE} alt="" />
        )}
      </div>

      <p className={styles.shorten} id={styles.title}>
        {home.title}
      </p>
      <p className={styles.shorten} id={styles.location}>
        {[home.kebele, home.woreda, home.subCity, home.city]
          .filter(Boolean)
          .join(", ")}
      </p>

      <div className={styles.icons}>
        <p>
          <IoBedOutline id={styles.bed} /> {home.bedRoom || 0}
        </p>
        <p>
          <FaShower id={styles.shower} /> {home.bathRoom || 0}
        </p>
        <p>
          <TfiRulerAlt2 /> {home.area || 0} m<sup>2</sup>
        </p>
      </div>

      <div className={styles.footer}>
        <p>
          {NumberFormater(home.price || 0)}
          {priceLabel}
        </p>
        <p className={styles.likes}>
          <AiOutlineHeart className={liked ? "text-lightBlue" : ""} />
          <span>{home.like?.length || 0} Likes</span>
        </p>
      </div>
    </div>
  );
};

export const HomesListingPage = ({ mode, eyebrow, title, subtitle }) => {
  const listing = useHomesListing(mode);

  return (
    <section className={styles.page}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <ListingFilters
        filters={listing.filters}
        onChange={listing.updateFilter}
        onReset={listing.resetFilters}
        showRentType={mode === "rent"}
        resultCount={listing.homes.length}
        total={listing.total}
        hasActiveFilters={listing.hasActiveFilters}
        subcityOptions={listing.subcityOptions}
      />

      <div className={styles.grid}>
        {listing.loading && listing.homes.length === 0 && (
          <h2 className={styles.status}>Loading homes...</h2>
        )}
        {!listing.loading && listing.error && listing.homes.length === 0 && (
          <h2 className={`${styles.status} ${styles.error}`}>{listing.error}</h2>
        )}
        {!listing.loading && !listing.error && listing.homes.length === 0 && (
          <h2 className={styles.status}>
            No home is available with the specified properties!
          </h2>
        )}
        {listing.homes.map((house) => (
          <NavLink
            key={house._id}
            className={styles.navLink}
            to={`/homeDetails/${house._id}`}
          >
            <Home home={house} />
          </NavLink>
        ))}
      </div>
    </section>
  );
};

const HomesListing = () => (
  <HomesListingPage
    mode="rent"
    eyebrow="Rent"
    title="Homes for rent"
    subtitle="Filter monthly and short-stay rentals by location, price, size, and rooms."
  />
);

export default HomesListing;
