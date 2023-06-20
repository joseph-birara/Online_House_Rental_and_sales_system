// import { Link, Navigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { UserContext } from "../contexts/UserContextProvider";
import axios from "axios";
import { UtilityContext } from "../contexts/UtilityContextProvide";


const RenatedHomesList = ({ data, handleSelect }) => {

  return (
    <div className="outline  flex justify-between items-center cursor-pointer gap-1 p-2 rounded-lg m-4 " >

      <div className="w-2/4 bg-gray-300 outline mx-2">
        <img className="" src={data.homeImage} alt="home imag is this" />
      </div>
      <div className="grow-0 shrink px-1 outline outline-[red] p-1 mr-3">
        <h2 className="text-xl">{data.homeTitle}</h2>
        <p className="text-sm mt-2">{data.homeDescription}</p>
        <div className="flex justify-start gap-8">
          <p><IoBedOutline /> {data.bedRoom}</p>
          <p><FaShower /> {data.bathRoom}</p>
          <p><TfiRulerAlt2 /> {data.area}m<sup>2</sup></p>
          <p className="flex justify-center items-center font-semibold">{data.appType}</p>
        </div>
        <button
          className="outline mr-3 mt-4 w-fit bg-[#f65050ee] hover:bg-[red] text-white py-2 px-2 rounded"
          onClick={() => handleSelect(data.applicationId, data.homeId)}
        >
          cancel Rent
        </button>
      </div>
    </div>
  )
};

const TenantRentedHomes = () => {

  const { HousesList, setHousesList, applications, setApplications } = useContext(UtilityContext);
  const { token, user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_baseURL}/application/all`)
      .then((response) => {

        // filter only tenant applications
        const filterApplicatios = response.data.filter(app => app.applicantId._id === user._id);
        setApplications(filterApplicatios);
        // console.log("ap", applications);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSelect = (appId, homeId) => {

    axios.put(`${process.env.REACT_APP_baseURL}/application/update`, { id: appId, status: 'completed' }, {
      headers: {
        Authorization: `Bearer + ${token}`,
      }
    }).then((response) => {
      console.log(' Applicatioin is accepted successfuly ');

      // update applications
      const updateApplication = applications.map(app => {
        if (app._id === appId) {
          return { ...app, status: 'completed' };
        }
        return app;
      });
      setApplications(updateApplication)

      // update homesList
      const updatedHomesList = HousesList.map(house => {
        if (house._id === homeId) {
          return { ...house, isRented: false };
        }
        return house;
      });
      setHousesList(updatedHomesList)

    })
      .catch((error) => {
        console.log('Error on canceling rented home');
        console.log(error);
      });
  }

  // get homesId rented by tenant
  const fitltedApplication = applications.filter(applica => user.applicationId.includes(applica._id) && applica.status === 'accepted');
  // const filteredHomes = fitltedApplication.map(AAA => ({ "house": AAA.homeId, "appId": AAA._id }));
  // console.log(' Tenant rented the following homes are ')
  // console.log(fitltedApplication)

  return (

    <div >
      <p className="text-xl font-semibold mx-4 mb-8 pb-4 border-b-1 border-[#7dd3fc]">
        List of Rented Homes
      </p>
      {fitltedApplication && fitltedApplication.map((applic) => {

        const data = {
          homeImage: applic.homeId.images[0],
          homeTitle: applic.homeId.title,
          homeDescription: applic.homeId.description,
          bedRoom: applic.homeId.bedRoom,
          bathRoom: applic.homeId.bathRoom,
          area: applic.homeId.area,
          appType: applic.applicationType,
          appplicationId: applic._id,
          homeId: applic.homeId._id
        };
        return <RenatedHomesList key={applic._id} data={data} handleSelect={handleSelect} />;
      })}

    </div>
  )
};

export default TenantRentedHomes