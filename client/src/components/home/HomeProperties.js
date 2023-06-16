import styles from "./HomeProperties.module.css";

const HomeProperties = ({ className, place }) => {
  return (
    <div className={`${styles.mainContainer} ${className}`}>
      <div className={styles.detailsTitle}>
        <h2>House Details</h2>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.col1}>
          <div className={styles.houseProp}>
            <p className={styles.prop}>City: </p> <p>{place.city}</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Subcity: </p> <p>{place.subCity}</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Woreda: </p> <p>{place.woreda}</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Kebele: </p> <p>{place.kebele}</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Area: </p> <p>{place.area}</p>
          </div>
        </div>
        <div className={styles.col2}>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Price: </p> <p>{place.price}</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Bedrooms: </p> <p>{place.bedRoom}</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Bathrooms: </p> <p>{place.bathRoom}</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Verified </p>{place.verified === true}<p></p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>House type: </p> <p>{place.homeType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProperties;
