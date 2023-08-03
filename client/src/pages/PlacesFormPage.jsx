import PhotosUploader from "../components/PhotosUploader";
import AmenitiesInput from "../components/AmenitiesInput";
import { useEffect, useContext, useRef, useState } from "react";
import LoadingOverlay from 'react-loading-overlay-ts';
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import { NumberFormater } from "../services/HelperFunction"
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
  let [loading, setLoading] = useState(false);

  // const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [homeType, setHomeType] = useState("regularRent");
  const [houseImageFiles, setHouseImageFiles] = useState([])
  const [forHomeUpdate, setForHomeUpdate] = useState({}) // store info when house update is need
  const [suggestion, setSuggestion] = useState('')
  const [waitingSuggestion, setWaitingSuggestion] = useState(false)

  const priceRef = useRef();
  const checkInRef = useRef();
  const checkOutRef = useRef();
  const maxGuestsRef = useRef();
  const [suggestError, setSugestErro] = useState('')

  // store the house for updaete
  // when id is set currhouse holdes that house detail
  let currHouse = null
  useEffect(() => {
    if (id) {
      currHouse = HousesList.find((house) => house._id === id)
      // currHouse = currHouse[0]
      console.log('the curr house is');
      console.log(currHouse);
    }
  }, [id])

  // holds the data when the user enters data
  useEffect(() => {
    if (!currHouse) {
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

  // holds html element
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  // holds html element
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  // holds html element
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  // for shortTerm checkin, checkout, number of guest and price user input part
  const ShortTerm = () => {
    return (
      <>
        {preInput(
          "Check in & out times",
          "add check in and out times, remember to have some time window for cleaning the room between guests"
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input className="outline outline-[1px] rounded m-1 px-1 " type="date" required ref={checkInRef} placeholder="14" />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input className="outline outline-[1px] rounded m-1 px-1 " type="date" required ref={checkOutRef} placeholder="11" />
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

  // for regular rent price input part
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

  // for sale price input part
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

  // saves place to the backend and send a reqeust
  const savePlaceHandler = async (ev) => {
    ev.preventDefault();
    setLoading(true)
    // to update the existing one
    if (Object.keys(forHomeUpdate).length > 0) {

      const houseData = {
        'id':id,
        title,
        city,
        subCity,
        woreda,
        kebele,
        "price": priceRef.current.value,
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
      // console.log('and the currhouse i s');
      // console.log(currHouse);

      axios.put(`http://localhost:4000/houses/update`, houseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(response => {
          setHousesList(prevHouseList => prevHouseList.map(home => {
            if (home.id === id) {
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
          setLoading(false)

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
              setLoading(false)
            });
        }
        )
        .catch(error => {
          console.log("Error uploading house images");
          console.log(error);
          setLoading(false)
        });
    }
  }

  // redirect to homes list page
  if (redirect) {
    return <Navigate to={"/homeOwner/homes/onListing"} />;
  }

  // handle home type
  const homeTypeHandler = (type) => {
    setHomeType(type);
  };

  // Suggestion Handler
  const suggestionHandler = () => {
    setWaitingSuggestion(true);

    if (!area || !bedRoom || !bathRoom || !subCity) {
      setSugestErro('Please Enter Bedroom, Area, Bathroom and subCity to get price suggestion')
      setWaitingSuggestion(false);
    } else {

      const payload = {
        homeType: homeType,
        area: area,
        bedRoom: bedRoom,
        bathRoom: bathRoom,
        subCity: subCity
      }

      axios.post(`http://localhost:4000/houses/getSimilar`, payload)
        .then((response) => {
          setSuggestion(response.data);
          setWaitingSuggestion(false)
          setSugestErro('')

        }).catch((err) => {
          setWaitingSuggestion(false)
          suggestError('Please check your internte connection')
          console.log(err)
        })
    }
  }

  // styling for selected and unselected options
  const unselectedBtnStyle = "primary bg-lightBlue my-4 hover:bg-lbHover";
  const selectedBtnStyle = "primary bg-blueBlack my-4";

  return (
    <div className="mx-8 px-6 pb-7">

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

      {/* form page part  */}
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
          placeholder="title, for example: My lovely apartment"
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

        <div className="flex justify-between  gap-10 ">

          <button type="submit" style={{ width: "40%", borderRadius: "2px" }}
            className="primary mx-6 bg-lightBlue my-4 hover:bg-lbHover">
            <LoadingOverlay
              active={loading}
              spinner
              className="loading-overlay"
              spinnerClassName="w-12 h-12"
              contentClassName="opacity-50 pointer-events-none"
              spinnerProps={{
                style: {
                  borderTopColor: 'lightblue',
                  borderLeftColor: 'lightblue',
                },
              }}
            >
            </LoadingOverlay>
            {loading ? "Processing..." : !id ? "Save" : "Update Home"}
          </button>

          <div
            onClick={suggestionHandler}
            className={`w-5/12 flex justify-center items-center text-white primary cursor-pointer rounded-sm bg-lightBlue my-4  hover:bg-lbHover`}>
            <LoadingOverlay
              active={waitingSuggestion}
              spinner
              className="loading-overlay"
              spinnerClassName="w-12 h-12"
              contentClassName="opacity-50 pointer-events-none"
              spinnerProps={{
                style: {
                  borderTopColor: 'lightblue',
                  borderLeftColor: 'lightblue',
                },
              }}
            >
            </LoadingOverlay>
            {waitingSuggestion ? "Processing..." : "Get Price Suggestions"}
          </div>
        </div>
      </form>

      {/* Suggestion output */}
      {<div className="outline outline-lightBlue outline-[3px] rounded-lg text-lg m-8 p-8 mb-12" >
        {console.log(suggestion)}
        {suggestion && < p >
          <p>price suggestion for you, </p>
          <p>Min price for the house is : <span className=" font-semibold">  {NumberFormater(suggestion.minPrice)} </span> </p>
          <p>Average price the house is : <span className=" font-semibold">  from {NumberFormater(suggestion.minAverage)}  <p className="font-normal inline px-1"> to </p> {NumberFormater(suggestion.maxAverage)} </span> </p>
          <p>Max price for the house is : <span className=" font-semibold">  {NumberFormater(suggestion.maxPrice)} </span> </p>
        </p>}
        {!suggestion && suggestError && <p className="text-xl font-light">{suggestError}</p>}
      </div>}
    </div >
  );
}
