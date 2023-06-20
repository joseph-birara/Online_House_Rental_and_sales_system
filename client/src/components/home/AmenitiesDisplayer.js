import styles from "./AmenitiesDisplayer.module.css";
import { TiTickOutline } from "react-icons/ti";

const AmenitiesDisplayer = ({ amenities }) => {
  // const amenities = {
  //   furnished: true,
  //   kitchen: true,
  //   wifi: false,
  //   balcony: true,
  //   garage: true,
  //   garden: true,
  //   waterPump: false,
  //   waterTank: true,
  //   freeParking: true,
  // };
  // const features = Object.keys(amenities);
  // const amenitiesArr = [];
  // features.forEach((feature) => {
  //   amenitiesArr.push([feature, amenities[feature]]);
  // });
  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>
        <h2>Amenities</h2>
      </div>
      <div className={styles.amenitiesContainer}>
        {amenities.map((amenity, idx) => (
          <p key={idx}>
            <TiTickOutline /> {amenity}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesDisplayer;
