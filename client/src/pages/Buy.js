import { useContext, useEffect } from "react";
import styles from "./HomesListing.module.css";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import { Home } from "./HomesListing";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Buy = () => {
  const { HousesList, setHousesList } = useContext(UtilityContext);
  useEffect(() => {
    axios
      .get("https://house-rental.onrender.com/houses/all")
      .then((response) => {
        console.log(response.data);
        setHousesList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setHousesList]);

  const salesHouseList = HousesList.filter((h) => h.homeType === "sale");
  // console.log("sale homes are");
  // console.log(salesHouseList);
  return (
    <div className="mx-1 p-2 flex gap-4 justify-start flex-wrap">
      {salesHouseList.map((house) => (
        <NavLink className={styles.navLink} to={`/homeDetails/${house._id}`}>
          <Home key={house._id} home={house} />
        </NavLink>
      ))}
    </div>
  );
};

export default Buy;
