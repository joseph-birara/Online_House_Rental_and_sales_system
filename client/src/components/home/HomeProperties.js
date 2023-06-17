import styles from "./HomeProperties.module.css";

const HomeProperties = ({ className, specificHouse }) => {
  return (
    <div className={`${styles.mainContainer} ${className}`}>
      <div className={styles.detailsTitle}>
        <h2>House Details</h2>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.col1}>
          <div className={styles.houseProp}>
            <p className={styles.prop}>City: </p> <p>{specificHouse.city}</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Subcity: </p> <p>{specificHouse.subCity}</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Woreda: </p> <p>{specificHouse.woreda}</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Kebele: </p> <p>{specificHouse.kebele}</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Area: </p> <p> {specificHouse.area} </p>
          </div>

          {/* for admin */}

          <p> show for admin other attbitues like vefied, suspended, isRented</p>

        </div>

        <div className={styles.col2}>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Price: </p> <p>{specificHouse.price}</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Bedrooms: </p> <p>{specificHouse.bedRoom}</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Bathrooms: </p> <p>{specificHouse.bathRoom}</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Home Status: </p> <p>{specificHouse.homeStatus}</p>
          </div>

          <div className={styles.houseProp}>
            <p className={styles.prop}>Home Type: </p> <p>{specificHouse.homeType}</p>
          </div>


          {/* for admin*/}



        </div>
      </div>
    </div>
  );
};

export default HomeProperties;
