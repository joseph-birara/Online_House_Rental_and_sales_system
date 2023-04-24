import PhotosUploader from "../components/PhotosUploader";
import AmenitiesInput from "../components/AmenitiesInput";
import { useEffect, useRef, useState } from "react";
//import axios from "axios";
//import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [subcity, setSubcity] = useState("");
  const [woreda, setWoreda] = useState("");
  const [kebele, setKebele] = useState("");
  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [status, setStatus] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [homeType, setHomeType] = useState("regularRent");

  const priceRef = useRef();
  const checkInRef = useRef();
  const checkOutRef = useRef();
  const maxGuestsRef = useRef();

  // useEffect(() => {
  //   if (!id) {
  //     return;
  //   }
  //   axios.get("/places/" + id).then((response) => {
  //     const { data } = response;
  //     setTitle(data.title);
  //     setAddress(data.address);
  //     setAddedPhotos(data.photos);
  //     setDescription(data.description);
  //     setPerks(data.perks);
  //     setExtraInfo(data.extraInfo);
  //     setCheckIn(data.checkIn);
  //     setCheckOut(data.checkOut);
  //     setMaxGuests(data.maxGuests);
  //     setPrice(data.price);
  //   });
  // }, [id]);
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  const ShortTerm = () => {
    return (
      <>
        {preInput(
          "Check in&out times",
          "add check in and out times, remember to have some time window for cleaning the room between guests"
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input type="number" ref={checkInRef} placeholder="14" />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input type="number" ref={checkOutRef} placeholder="11" />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input type="number" ref={maxGuestsRef} />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              ref={priceRef}
              placeholder="price in ETB, for example: 500"
            />
          </div>
        </div>
      </>
    );
  };

  const RegularRent = () => {
    return (
      <>
        {preInput("Price", "Monthly rent price of your house, in ETB")}
        <input
          type="number"
          ref={priceRef}
          placeholder="price, for example: 15000"
        />
      </>
    );
  };

  const Sale = () => {
    return (
      <>
        {preInput("Price", "Sale price of your house, in ETB")}
        <input
          type="number"
          ref={priceRef}
          placeholder="price, for example: 5000000"
        />
      </>
    );
  };

  async function savePlace(ev) {
    // ev.preventDefault();
    // const placeData = {
    //   title,
    //   address,
    //   addedPhotos,
    //   description,
    //   perks,
    //   extraInfo,
    //   checkIn,
    //   checkOut,
    //   maxGuests,
    //   price,
    // };
    // if (id) {
    //   // update
    //   await axios.put("/places", {
    //     id,
    //     ...placeData,
    //   });
    //   setRedirect(true);
    // } else {
    //   // new place
    //   await axios.post("/places", placeData);
    //   setRedirect(true);
    // }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  const homeTypeHandler = (type) => {
    setHomeType(type);
  };
  const unselectedBtnStyle = "primary bg-lightBlue my-4 hover:bg-lbHover";
  const selectedBtnStyle = "primary bg-blueBlack my-4";
  return (
    <div>
      {/* <AccountNav /> */}
      <div>
        <p>Please choose the home type:</p>
        <div className="flex gap-6">
          <button
            className={
              homeType === "regularRent" ? selectedBtnStyle : unselectedBtnStyle
            }
            onClick={() => homeTypeHandler("regularRent")}
          >
            Regular rent
          </button>
          <button
            className={
              homeType === "shortTermRent"
                ? selectedBtnStyle
                : unselectedBtnStyle
            }
            onClick={() => homeTypeHandler("shortTermRent")}
          >
            Short-term rent
          </button>
          <button
            className={
              homeType === "sale" ? selectedBtnStyle : unselectedBtnStyle
            }
            onClick={() => homeTypeHandler("sale")}
          >
            Sale
          </button>
        </div>
      </div>
      <form onSubmit={savePlace}>
        {preInput(
          "Title",
          "Title for your place. should be short and catchy as in advertisement"
        )}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: My lovely apt"
        />
        {preInput("Address", "Address to this house")}
        <div className="flex gap-3">
          <input
            type="text"
            value={city}
            onChange={(ev) => setCity(ev.target.value)}
            placeholder="city"
          />
          <input
            type="text"
            value={subcity}
            onChange={(ev) => setSubcity(ev.target.value)}
            placeholder="subcity"
          />
          <input
            type="text"
            value={woreda}
            onChange={(ev) => setWoreda(ev.target.value)}
            placeholder="woreda"
          />
          <input
            type="text"
            value={kebele}
            onChange={(ev) => setKebele(ev.target.value)}
            placeholder="kebele"
          />
        </div>
        {preInput("Details", "Some details about your house")}
        <div className="flex gap-3">
          <input
            type="number"
            value={area}
            onChange={(ev) => setArea(ev.target.value)}
            placeholder="area in sq. meters"
          />
          <input
            type="number"
            value={bedrooms}
            onChange={(ev) => setBedrooms(ev.target.value)}
            placeholder="bedrooms"
          />
          <input
            type="number"
            value={bathrooms}
            onChange={(ev) => setBathrooms(ev.target.value)}
            placeholder="bathrooms"
          />
          <input
            type="text"
            value={status}
            onChange={(ev) => setStatus(ev.target.value)}
            placeholder="home status"
          />
        </div>
        {preInput("Photos", "more = better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "description of your house")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput("Amenities", "select all the amenities of your place")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <AmenitiesInput selected={perks} onChange={setPerks} />
        </div>

        {homeType === "regularRent" && <RegularRent />}
        {homeType === "shortTermRent" && <ShortTerm />}
        {homeType === "sale" && <Sale />}
        <button className="primary bg-lightBlue my-4 hover:bg-lbHover">
          Save
        </button>
      </form>
    </div>
  );
}
