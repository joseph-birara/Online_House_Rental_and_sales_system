import PhotosUploader from "../components/PhotosUploader";
import AmenitiesInput from "../components/AmenitiesInput";
import { useEffect, useContext, useRef, useState } from "react";
//import axios from "axios";
//import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import axios from "axios";




export default function PlacesFormPage() {
  const { user, token } = useContext(UserContext)
  const { HousesList, setHousesList } = useContext(UtilityContext)

  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [subCity, setSubcity] = useState("");
  const [woreda, setWoreda] = useState("");
  const [kebele, setKebele] = useState("");
  const [area, setArea] = useState("");
  const [bedRoom, setBedrooms] = useState("");
  const [bathRoom, setBathrooms] = useState("");

  // const [status, setStatus] = useState("");
  // const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [homeType, setHomeType] = useState("regularRent");
  const [houseImageFiles, setHouseImageFiles] = useState([])
  const [forHomeUpdate, setForHomeUpdate] = useState({}) // store info when house update is need

  const priceRef = useRef();
  const checkInRef = useRef();
  const checkOutRef = useRef();
  const maxGuestsRef = useRef();

  let currHouse = null
  if (id) {
    currHouse = HousesList.filter((house) => house._id === id)
    currHouse = currHouse[0]
  }

  useEffect(() => {
    if (!id) {
      return;
    }

    if (currHouse) {

      if (currHouse.homeType === "shortTermRent") { // shortTermRent
        checkInRef.current.value = currHouse.shortTerm.checkin ?? checkInRef.current.value // checkin
        checkOutRef.current.value = currHouse.shortTerm.checkout ?? checkOutRef.current.value//checkout
        maxGuestsRef.current.value = currHouse.shortTerm.maxGuest ?? maxGuestsRef.current.value // maxGuest
      }

      // priceRef.current.value = currHouse.price ?? priceRef.current.value;
      priceRef.current.value = currHouse.price !== undefined ? currHouse.price : priceRef.current.value;
      setTitle(currHouse.title)
      setCity(currHouse.city)
      setSubcity(currHouse.subCity)
      setWoreda(currHouse.woreda)
      setKebele(currHouse.kebele)
      setArea(currHouse.area)
      setHomeType(currHouse.homeType)
      setDescription(currHouse.description)
      setBedrooms(currHouse.bedRoom)
      setBathrooms(currHouse.bathRoom)
      setPerks(currHouse.amenity)
      setForHomeUpdate(currHouse)
    }
  }, [currHouse]);

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
            <input type="number" required ref={checkInRef} placeholder="14" />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input type="number" required ref={checkOutRef} placeholder="11" />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input type="number" required ref={maxGuestsRef} />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              required
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
          required
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
          required
          type="number"
          ref={priceRef}
          placeholder="price, for example: 5000000"
        />
      </>
    );
  };

  const savePlaceHandler = async (ev) => {
    ev.preventDefault();
    // to update the existing one
    if (Object.keys(forHomeUpdate).length > 0) {

      const houseData = {
        'id': currHouse._id,
        title,
        city,
        subCity,
        woreda,
        kebele,
        "price": priceRef.current.value,
        "images": currHouse.images,
        area,
        "shortTerm": {},
        description,
        homeType,
        bedRoom,
        bathRoom,
        "amenity": perks,
      };
      if (homeType === 'shortTermRent') {
        houseData.shortTerm = {
          "checkin": checkInRef.current.value,
          "checkout": checkOutRef.current.value,
          "maxGuest": maxGuestsRef.current.value
        }
      }
      // console.log('on update ---');
      // console.log(houseData);
      // console.log('and the currhouse i s');
      // console.log(currHouse);

      axios.put(`http://localhost:4000/houses/update`, houseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(response => {
          setHousesList(prevHouseList => prevHouseList.map(home => {
            if (home.id === currHouse._id) {
              houseData.ownerId = currHouse.ownerId
              return houseData;
            } else {
              return home;
            }
          }));

          console.log('updated succesfuly');
          setRedirect(true)// redirect to house list page
        })
        .catch(error => {
          console.log("Error on updating house");
          console.log(error);
        });
    }

    // to register a nwe house
    else { //  assumning that images are added (houseImageFiles.length > 0)
      // image upload part
      const houseData = {
        ownerId: user._id,
        title,
        city,
        subCity,
        woreda,
        kebele,
        "price": priceRef.current.value,
        "images": [],
        area,
        "shortTerm": {},
        description,
        homeType,
        bedRoom,
        bathRoom,
        "amenity": perks,
      };
      if (homeType === 'shortTermRent') {
        houseData.shortTerm = {
          "checkin": checkInRef.current.value,
          "checkout": checkOutRef.current.value,
          "maxGuest": maxGuestsRef.current.value
        }
      }

      let imageUploadPromises = []
      for (let i = 0; i < houseImageFiles.length; i++) {
        const formdata = new FormData()
        formdata.append('file', houseImageFiles[i].value)
        formdata.append('upload_preset', process.env.REACT_APP_preset_key)
        imageUploadPromises.push(axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_cloud_name}/image/upload`, formdata))
      }

      console.log('new home data ');
      console.log(houseData);

      // // save house part 
      Promise.all(imageUploadPromises)
        .then(responses => {
          console.log("All house images uploaded successfully");
          let imageLinks = responses.map(response => response.data.secure_url)
          houseData.images = imageLinks
          // console.log('the added house is here with its this ------');
          // console.log(houseData);
          axios.post(`http://localhost:4000/houses/add`, houseData, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
            .then(response => {
              console.log("House saved successfully");
              // console.log(houseData);
              setHousesList([...HousesList, houseData]) //update house list state
              setRedirect(true)// redirect to house list page

            })
            .catch(error => {
              console.log("Error saving house");
              console.log(error);
            });
        }
        )
        .catch(error => {
          console.log("Error uploading house images");
          console.log(error);
        });

    }
  }

  if (redirect) {
    return <Navigate to={"/homeOwner/homes/onListing"} />;
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
              homeType === "shortTermRent" ? selectedBtnStyle : unselectedBtnStyle
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
      <form onSubmit={savePlaceHandler}>
        {preInput(
          "Title",
          "Title for your place. should be short and catchy as in advertisement"
        )}
        <input
          type="text"
          required
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: My lovely apt"
        />
        {preInput("Address", "Address to this house")}
        <div className="flex gap-3">
          <input
            type="text"
            required
            value={city}
            onChange={(ev) => setCity(ev.target.value)}
            placeholder="city"
          />
          <input
            type="text"
            required
            value={subCity}
            onChange={(ev) => setSubcity(ev.target.value)}
            placeholder="subCity"
          />
          <input
            type="text"
            required
            value={woreda}
            onChange={(ev) => setWoreda(ev.target.value)}
            placeholder="woreda"
          />
          <input
            type="text"
            required
            value={kebele}
            onChange={(ev) => setKebele(ev.target.value)}
            placeholder="kebele"
          />
        </div>
        {preInput("Details", "Some details about your house")}
        <div className="flex gap-3">
          <input
            type="number"
            required
            value={area}
            onChange={(ev) => setArea(ev.target.value)}
            placeholder="area in sq. meters"
          />
          <input
            type="number"
            required
            value={bedRoom}
            onChange={(ev) => setBedrooms(ev.target.value)}
            placeholder="bedrooms"
          />
          <input
            type="number"
            required
            value={bathRoom}
            onChange={(ev) => setBathrooms(ev.target.value)}
            placeholder="bathrooms"
          />

        </div>
        {preInput("Photos", "more = better")}

        {/* to upload house  images */}
        <PhotosUploader houseImages={houseImageFiles} setHouseImageFiles={setHouseImageFiles} hasHouseId={currHouse ? true : false} imageLinks={currHouse ? currHouse.images : ''} />

        {preInput("Description", "description of your house")}
        <textarea
          required
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
