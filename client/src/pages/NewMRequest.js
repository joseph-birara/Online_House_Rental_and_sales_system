import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContextProvider";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import { useParams } from "react-router-dom";
import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { TfiRulerAlt2 } from "react-icons/tfi";

const _HOME = ({ house }) => {
  return (
    <div
      className="flex justify-between items-center cursor-pointer gap-1 p-4 rounded-lg m-4"
      style={{ boxShadow: "0 0 1px #091240" }}
    >
      <div className="flex w-32 h-32 bg-gray-300 shrink-0 mr-4 ">
        <img src={house.images[0]} alt="" />
      </div>
      <div className="grow-0 shrink px-1">
        <h2 className="text-xl">{house.title}</h2>
        <p className="text-sm mt-2">{house.description}</p>
        <div className="flex justify-start gap-8">
          <p>
            <IoBedOutline /> {house.bedRoom}
          </p>
          <p>
            <FaShower /> {house.bathRoom}
          </p>
          <p>
            <TfiRulerAlt2 /> {house.area}m<sup>2</sup>
          </p>
          <p>{house.homeType}</p>
        </div>
      </div>
    </div>
  );
};

export const RequestForm = () => {
  const { houseId } = useParams();
  const { HousesList } = useContext(UtilityContext);
  const { user, token } = useContext(UserContext);
  const ownerId = HousesList.filter((home) => home._id === houseId).ownerId._id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const mRequestData = {
      homeId: houseId,
      ownerId: ownerId,
      tenantId: user._id,
      title: title,
      description: description,
    };
    axios
      .post(
        `https://house-rental.onrender.com/maintenance/send`,
        mRequestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("House saved successfully");
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.log("Error saving house");
        console.log(error);
      });
    console.log("Title:", title);
    console.log("Description:", description);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button className="bg-lightBlue p-2 rounded" type="submit">
        Submit
      </button>
    </form>
  );
};

const NewMRequest = () => {
  // const { user } = useContext(UserContext);
  // let tenantHomes = [];
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_baseURL}/rent/getByTenant`, {
  //       id: user._id,
  //     })
  //     .then((response) => {
  //       // console.log("aa", response.data);
  //       tenantHomes = response.data;
  //       // console.log("ap", applications);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  // return (
  // <div>
  //   {tenantHomes.map((house) => (
  //     <NavLink className={styles.navLink} to={`/tenant/newMRequest/form/${house._id}`}>
  //       <_HOME key={house._id} house={house} />
  //     </NavLink>
  //   ))}
  // </div>
};

export default NewMRequest;
