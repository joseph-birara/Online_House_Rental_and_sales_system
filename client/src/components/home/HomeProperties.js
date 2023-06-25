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

          {/* <p> show for admin other attbitues like vefied, suspended, isRented</p> */}

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
            <p className={styles.prop}>Home Status: </p>
            <p>

              <svg
                className={`w-4 h-4 scale-125 mr-1.5 ${specificHouse.homeStatus ? 'text-[#38A169]' : 'text-[#DC2626]'}   dark:text-green-400 flex-shrink-0`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="m-0 p-o text-base"> {specificHouse.homeStatus ? 'Verified' : 'Not Verified'} </span>
            </p>


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
