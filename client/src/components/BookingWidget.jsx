import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
// import axios from "axios";
import { Navigate } from "react-router-dom";
// import {UserContext} from "./UserContext.jsx";
import { UserContext } from "../contexts/UserContextProvider";
import axios from "axios";
import { UtilityContext } from "../contexts/UtilityContextProvide";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [visitRequest, setVisitRequest] = useState("");
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const {user, token} = useContext(UserContext);
  const {setApplications} = useContext(UtilityContext);

  // useEffect(() => {
  //   if (user) {
  //     setName(user.name);
  //   }
  // }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function applyHandler() {
    const applicationData = {
      applicantId: user._id,
      homeId: place._id,
      ownerId: place.ownerId._id,
      applicationType: place.homeType,
      checkin: checkIn,
    }

    if (place.homeType === "shortTerm"){
      applicationData.checkout = checkOut
    }
    if(place.homeType !== "sale"){
      applicationData.numGuests = numberOfGuests
    }
    if(Boolean(visitRequest)){
      applicationData.visitRequest = visitRequest
    }
    console.log(applicationData);
    console.log(token);

    axios.post(`${process.env.REACT_APP_baseURL}/application/send`, applicationData, {
      headers: {
        Authorization: `Bearer + ${token}`,
      }})
      .then((response) => {
        console.log(response.data.message)
        console.log(response)
        setRedirect(`/tenant/applications`);
        // setHousesList(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
      // const bookingId = response.data._id;
      // setRedirect(`/account/bookings/${bookingId}`);
  }

  const priceRate = place.homeType === "sale" ? "total" : place.homeType === "regular" ? "per month" : "per night";

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div
      className="bg-white shadow-2xl p-4 rounded-2xl h-fit w-[400px]"
      style={{
        boxShadow: "0 2px 8px #091240",
      }}
    >
      <div className="text-2xl text-center">
        Price: ${place.price} / {priceRate}
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <input className="disabled:bg-[dimgrey] disabled:text-[linen] disabled:opacity-100"
              type="date"
              disabled={place.homeType !== "shortTerm"}
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input className="disabled:bg-[dimgrey] disabled:text-[linen] disabled:opacity-100"
            type="number"
            disabled={place.homeType === "sale"}
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
          />
        </div>
        <div className="py-3 px-4 border-t">
          <label>Pick a date for visit request(Optional):</label>
          <input 
            type="date"
            value={visitRequest}
            onChange={(ev) => setVisitRequest(ev.target.value)}
          />
        </div>
      </div>
      <button
        onClick={applyHandler}
        className="primary  bg-lightBlue hover:bg-lbHover mt-4"
      >
       Apply to {place.homeType === "sale" ? 'buy' : 'rent'}
        {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
      </button>
    </div>
  );
}
