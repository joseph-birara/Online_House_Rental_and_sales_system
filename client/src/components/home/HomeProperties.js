import styles from "./HomeProperties.module.css";

const HomeProperties = ({ className }) => {
  return (
    <div className={`${styles.mainContainer} ${className}`}>
      <div className={styles.detailsTitle}>
        <h2>House Details</h2>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.col1}>
          <div className={styles.houseProp}>
            <p className={styles.prop}>City: </p> <p>Addis Ababa</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Subcity: </p> <p>Addis Ababa</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Woreda: </p> <p>Addis Ababa</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Kebele: </p> <p>Addis Ababa</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Area: </p> <p>Addis Ababa</p>
          </div>
        </div>
        <div className={styles.col2}>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Price: </p> <p>Addis Ababa</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Bedrooms: </p> <p>Addis Ababa</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Bathrooms: </p> <p>Addis Ababa</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Home Status: </p> <p>Addis Ababa</p>
          </div>
          <div className={styles.houseProp}>
            <p className={styles.prop}>Home Type: </p> <p>Addis Ababa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProperties;
