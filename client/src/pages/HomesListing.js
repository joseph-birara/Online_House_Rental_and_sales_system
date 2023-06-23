import { NavLink } from "react-router-dom";
import styles from "./HomesListing.module.css";
import ImageSlider from "../components/ImageSlider";
import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { AiOutlineHeart } from "react-icons/ai";
import Button from "../UI/Button";
import { useState, useContext, useEffect, useReducer } from "react";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import axios from "axios";
import Dropdown from "../components/Dropdown";

export const Home = ({ home }) => {
  const img = {
    width: "100%",
    height: "15rem",
    borderRadius: "15px",
  };
  const sliderContainer = {
    width: "100%",
  };

  const pupulatedImagesObject = home.images.map((item) => {
    return {
      url: item,
    };
  });
  return (
    <div className={styles.mainContainer}>
      <ImageSlider
        images={pupulatedImagesObject}
        autoplay={false}
        sliderContainer={sliderContainer}
        imgDim={img}
      />
      <p className={styles.shorten} id={styles.title}>
        {home.title}
      </p>
      <p className={styles.shorten} id={styles.location}>
        {home.kebele}, {home.woreda}, {home.subCity}, {home.city}
      </p>
      <div className={styles.icons}>
        <p>
          <IoBedOutline id={styles.bed} /> {home.bedRoom}
        </p>
        <p>
          <FaShower id={styles.shower} /> {home.bathRoom}
        </p>
        <p>
          <TfiRulerAlt2 /> {home.area} m<sup>2</sup>
        </p>
      </div>
      <div className="font-semibold mx-3 border border-[lightgray] flex justify-between gap-1 items-center p-0.5 ">
        <p className=""> ETB {home.price}/month</p>

        <p className="border border-[red] px-1">
          <Button className="transform scale-150 ">
            <AiOutlineHeart />
          </Button>
          <span> Likes</span>
        </p>
      </div>
    </div>
  );
};

const homesReducer = (state, action) => {
  let houses = state.homes;

  if (action.type === "initialize") {
    return {
      ...state,
      homes: action.payload.houses,
    };
  } else if (action.type === "subcity") {
    if (Boolean(state.subcity)) {
      houses = action.payload.allHouses.filter(
        (home) =>
          state.price.min <= home.price &&
          home.price <= state.price.max &&
          state.area.min <= home.area &&
          home.area <= state.area.max
      );
    }

    if (action.payload.selected === "All subcities") {
      return {
        ...state,
        homes: houses,
        subcity: action.payload.selected,
      };
    }

    return {
      ...state,
      homes: houses.filter((home) => home.subCity === action.payload.selected),
      subcity: action.payload.selected,
    };
  } else if (action.type === "minPrice") {
    if (Boolean(state.price.min)) {
      houses = action.payload.allHouses.filter(
        (home) =>
          home.price <= state.price.max &&
          state.area.min <= home.area &&
          home.area <= state.area.max
      );
      if (state.subcity !== "All subcities") {
        houses = houses.filter((home) => home.subCity === state.subcity);
      }
    }
    return {
      ...state,
      homes: houses.filter((home) => home.price >= action.payload.minPrice),
      price: { ...state.price, min: action.payload.minPrice },
    };
  } else if (action.type === "maxPrice") {
    if (state.price.max !== Number.MAX_VALUE) {
      houses = action.payload.allHouses.filter(
        (home) =>
          state.price.min <= home.price &&
          state.area.min <= home.area &&
          home.area <= state.area.max
      );
      if (state.subcity !== "All subcities") {
        houses = houses.filter((home) => home.subCity === state.subcity);
      }
    }
    return {
      ...state,
      homes: houses.filter((home) => home.price <= action.payload.maxPrice),
      price: { ...state.price, max: action.payload.maxPrice },
    };
  } else if (action.type === "minArea") {
    if (Boolean(state.area.min)) {
      houses = action.payload.allHouses.filter(
        (home) =>
          state.price.min <= home.price &&
          home.price <= state.price.max &&
          home.area <= state.area.max
      );
      if (state.subcity !== "All subcities") {
        houses = houses.filter((home) => home.subCity === state.subcity);
      }
    }
    return {
      ...state,
      homes: houses.filter((home) => home.area >= action.payload.minArea),
      area: { ...state.area, min: action.payload.minArea },
    };
  } else if (action.type === "maxArea") {
    if (state.area.max !== Number.MAX_VALUE) {
      houses = action.payload.allHouses.filter(
        (home) =>
          state.price.min <= home.price &&
          home.price <= state.price.max &&
          state.area.min <= home.area
      );
      if (state.subcity !== "All subcities") {
        houses = houses.filter((home) => home.subCity === state.subcity);
      }
    }
    return {
      ...state,
      homes: houses.filter((home) => home.area <= action.payload.maxArea),
      area: { ...state.area, max: action.payload.maxArea },
    };
  }
};

const HomesListing = () => {
  const { HousesList, setHousesList } = useContext(UtilityContext);

  const [homesState, dispatchHomes] = useReducer(homesReducer, {
    homes: HousesList,
    subcity: "All subcities",
    price: { min: 0, max: Number.MAX_VALUE },
    area: { min: 0, max: Number.MAX_VALUE },
  });
  console.log("hs: ", homesState);

  const subcityHandler = (id, type, selectedSubcity) => {
    dispatchHomes({
      type: "subcity",
      payload: { selected: selectedSubcity, allHouses: HousesList },
    });
  };

  const dropDownOptions = [
    "Addis Ketema",
    "Akaky Kaliti",
    "Arada",
    "Bole",
    "Gullele",
    "Kirkos",
    "Kolfe Keranio",
    "Lideta",
    "Nifas Silk-Lafto",
    "Yeka",
    "All subcities",
  ];

  useEffect(() => {
    axios
      .get("https://house-rental.onrender.com/houses/all")
      .then((response) => {
        console.log(response.data);
        setHousesList(response.data);
        dispatchHomes({
          type: "initialize",
          payload: {
            houses: response.data.filter((home) => home.isRented === false),
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleMinPriceChange = (e) => {
    let enteredNum = parseInt(e.target.value);
    if (e.target.value.length == 0) {
      enteredNum = 0;
    }
    dispatchHomes({
      type: "minPrice",
      payload: { minPrice: enteredNum, allHouses: HousesList },
    });
  };

  const handleMaxPriceChange = (e) => {
    let enteredNum = parseInt(e.target.value);
    if (e.target.value.length == 0) {
      enteredNum = Number.MAX_VALUE;
    }
    dispatchHomes({
      type: "maxPrice",
      payload: { maxPrice: enteredNum, allHouses: HousesList },
    });
  };

  const handleMinAreaChange = (e) => {
    let enteredNum = parseInt(e.target.value);
    if (e.target.value.length == 0) {
      enteredNum = 0;
    }
    dispatchHomes({
      type: "minArea",
      payload: { minArea: enteredNum, allHouses: HousesList },
    });
  };

  const handleMaxAreaChange = (e) => {
    let enteredNum = parseInt(e.target.value);
    if (e.target.value.length == 0) {
      enteredNum = Number.MAX_VALUE;
    }
    dispatchHomes({
      type: "maxArea",
      payload: { maxArea: enteredNum, allHouses: HousesList },
    });
  };

  return (
    <>
      <div className="flex gap-8">
        <Dropdown
          actions={dropDownOptions}
          onSelect={subcityHandler}
          itemType="subcity"
          mainText="Select subcity"
        />

        <div>
          <label>
            <input
              type="text"
              onChange={handleMinPriceChange}
              placeholder="Min price"
            />
            <br />
            <input
              type="text"
              onChange={handleMaxPriceChange}
              placeholder="Max price"
            />
          </label>
        </div>

        <div>
          <label>
            <input
              type="text"
              onChange={handleMinAreaChange}
              placeholder="Min area"
            />
            <br />
            <input
              type="text"
              onChange={handleMaxAreaChange}
              placeholder="Max area"
            />
          </label>
        </div>
      </div>
      <div className="mx-2 p-2 flex gap-4 justify-start flex-wrap">
        {homesState.homes.map(
          (house) =>
            house.homeType !== "sale" && (
              <NavLink
                className={styles.navLink}
                to={`/homeDetails/${house._id}`}
              >
                <Home key={house._id} home={house} />
              </NavLink>
            )
        )}
      </div>
    </>
  );
};

export default HomesListing;
