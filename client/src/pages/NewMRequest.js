import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContextProvider";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import { IoBedOutline } from "react-icons/io5";
import { FaCheck, FaShower } from "react-icons/fa";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { TiDelete } from "react-icons/ti";
import { Link, useNavigate, useParams } from "react-router-dom";

const RequestListPage = ({ data, handleSelect }) => {

  return (
    <div className="outline outline-[2px] outline-[lightgray]  flex justify-between items-center  gap-1 p-2 rounded-lg m-4 " >

      <div className="w-2/4 bg-gray-300 mx-2">
        <img className=" rounded-lg" src={data.homeImage} alt="home imag is this" />
      </div>
      <div className="grow-0 shrink px-1 p-1 mr-3">
        <h2 className="text-xl">{data.homeTitle}</h2>
        <p className="text-sm line-clamp-3 mt-2">{data.homeDescription}</p>
        <div className="flex justify-start gap-8">
          <p><IoBedOutline /> {data.bedRoom}</p>
          <p><FaShower /> {data.bathRoom}</p>
          <p><TfiRulerAlt2 /> {data.area}m<sup>2</sup></p>
          <p className="flex justify-center items-center font-semibold">{data.appType}</p>
          <p className="font-semibold"> Owner: {data.ownerName} </p>
          <p className="flex justify-center items-center font-semibold ">Payment Status:

            <p className="flex justify-center items-center">
              {data.paymentStatus ? (<FaCheck className="text-[green]" size={20} />) : (<TiDelete className="text-[red]" size={20} />)}
            </p>
          </p>
        </div>

      </div>
    </div>
  )
};

export const RequestForm = ({ payload }) => {
  const { user, token } = useContext(UserContext);
  const { navigate } = useNavigate()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // data payload to be sent
    payload.title = title
    payload.description = description
    // const mRequestData = {
    //   homeId: houseId,
    //   ownerId: ownerId,
    //   tenantId: user._id,
    //   title: title,
    //   description: description,
    // };
    const mRequestData = {}
    axios
      .post(`http://localhost:4000/maintenance/send`, mRequestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("House saved successfully");
        navigate('/tenant/mRequest') // navigate to after sending request
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
  const { applications, setApplications } = useContext(UtilityContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_baseURL}/application/bytenant/${user._id}`)
      .then((response) => {
        setApplications(response.data);
        // console.log("ap", applications);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // get homesId rented by tenant
  const fitltedApplication = applications.filter(applica => applica.status === 'accepted');
  const handleSelect = () => {
    console.log("button is clicked");
  }

  return (

    <div >
      <p className="text-xl font-semibold mx-4 mb-8 pb-4 border-b-1 border-[#7dd3fc]">
        List of Rented Homes
      </p>
      {fitltedApplication && fitltedApplication.map((applic) => {
        if (!applic.applicantId) {
          return null; // Skip this application if applicantId is undefined
        }
        if (!applic.homeId.isRented) {
          return null; // skip homes which are not rented, only rented homes
        }

        const data = {
          homeImage: applic.homeId.images[0],
          homeTitle: applic.homeId.title,
          homeDescription: applic.homeId.description,
          bedRoom: applic.homeId.bedRoom,
          bathRoom: applic.homeId.bathRoom,
          area: applic.homeId.area,
          appType: applic.applicationType,
          paymentStatus: applic.paymentStatus,
          ownerName: applic.ownerId.name,
          payload: {
            homeId: applic.homeId._id,
            ownerId: applic.ownerId._id,
            tenantId: applic.applicantId._id,
          },

          appplicationId: applic._id,
        };

        return (
          <Link>
            <RequestListPage key={applic._id} data={data} />
          </Link>)
      })}

    </div>
  )
};

export default NewMRequest;
