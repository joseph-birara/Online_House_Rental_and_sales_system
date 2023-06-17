import styles from "./AmenitiesDisplayer.module.css";
import { TiTickOutline } from "react-icons/ti";

const AmenitiesDisplayer = () => {
  const amenities = {
    furnished: true,
    kitchen: true,
    wifi: false,
    balcony: true,
    garage: true,
    garden: true,
    waterPump: false,
    waterTank: true,
    freeParking: true,
  };
  const features = Object.keys(amenities);
  const amenitiesArr = [];
  features.forEach((feature) => {
    amenitiesArr.push([feature, amenities[feature]]);
  });


  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>
        <h2>Amenities</h2>
      </div>
      {/* <div className={styles.amenitiesContainer}> */}
      <div className="flex text-lg pl-6 gap-x-12 flex-wrap content-between ">
        {amenitiesArr.map(
          (amenity, idx) =>
            amenity[1] && (
              <p className="w-1/6 m-2 py-2" key={idx}>
                <TiTickOutline /> {amenity[0]}
              </p>
            )
        )}
      </div>
    </div>
  );
};

export default AmenitiesDisplayer;
