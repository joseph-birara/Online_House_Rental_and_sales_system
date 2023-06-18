import React, { useContext, useEffect } from "react";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import { Link } from "react-router-dom";
import axios from "axios";

const Application = ({ data }) => {
  return (
    <Link
      to="#"
      className="flex justify-between items-center cursor-pointer gap-1 p-4 rounded-lg m-4"
      style={{ boxShadow: "0 0 1px #091240" }}
    >
      <div className="flex w-32 h-32 bg-gray-300 shrink-0 mr-4">
        <img src={data.homePic} alt="" />
      </div>
      <div className="grow-0 shrink">
        <h2 className="text-xl">{data.homeTitle}</h2>
        <p className="text-sm mt-2">{data.homeDescription}</p>
        <div className="flex justify-start gap-4 text-sm flex-wrap">
          <div>
            <p>
              <span>Application type: </span> <span>{data.appType}</span>
            </p>
            <p>
              <span>Houseowner name: </span> <span>{data.ownerName}</span>
            </p>
          </div>
          <div>
            <p>
              <span>Checkin date: </span> <span>{data.checkin}</span>
            </p>
            {data.checkout && (
              <p>
                <span>Checkout date: </span> <span>{data.checkout}</span>
              </p>
            )}
          </div>
          <div>
            <p>
              <span>Total price: </span> <span>{data.price}</span>
            </p>
          </div>
          <div>
            <p>
              <span>App Status: </span> <span>{data.appStatus}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

const TenantApplications = () => {
  const { applications, setApplications, HousesList } =
    useContext(UtilityContext);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_baseURL}/application/all`)
      .then((response) => {
        // console.log("aa", response.data);
        setApplications(response.data);
        // console.log("ap", applications);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-4">
      {console.log(HousesList)}
      {applications.length > 0 &&
        applications.map((app) => {
          const ownerName = app.ownerId.name + " " + app.ownerId.lastName;
          const house = HousesList.filter(
            (house) => house._id === app.homeId._id
          )[0]; //need app.houseId
          console.log(house);
          const data = {
            homePic: house.images[0],
            homeTitle: house.title,
            homeDescription: house.description,
            appType: app.applicationType,
            ownerName: ownerName,
            checkin: app.checkin,
            checkout: app.checkout,
            price: house.price,
            appStatus: app.status,
          };
          return <Application key={app._id} data={data} />;
        })}
    </div>
  );
};

export default TenantApplications;
