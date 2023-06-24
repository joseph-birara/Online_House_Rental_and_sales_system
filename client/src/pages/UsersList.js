// import { Link, Navigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import axios from "axios";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import { NumberFormater } from "../services/HelperFunction"

const RentedTenantList = ({ data, handleSelect }) => {
  return (
    <div className="outline outline-[lightgray]  flex  items-center cursor-pointer gap-1 py-1 rounded-lg m-4 ">
      <div className=" w-3/12 rounded-md bg-gray-300  mx-2">
        <img
          className="rounded-lg "
          src={data.tenantImage && data.tenantImage}
          onError={(e) => {
            e.target.src =
              "https://media.gettyimages.com/id/1227618807/vector/human-face-avatar-icon-profile-for-social-network-man-vector-illustration.jpg?s=1024x1024&w=gi&k=20&c=-Iz47dY99Hx3S8JAkVLKvzQN65Qn8m7UPFAMbJvfd1Y=";
          }}
          alt="home imag is this"
        />
      </div>
      <div className="grow-0 w-3/4 shrink px-1 ">
        <h3 className="text-2xl">
          {data.name} {data.lastName}
        </h3>
        <h4 className="text-xl"> {data.homeTitle}</h4>
        <div className="flex text-lg gap-10 mx-5">
          <div className="mt-1">
            <p>Email: {data.email}</p>
            <p>Phone: {data.phone}</p>
          </div>

          <div className="mt-1">
            <p >Price: <strong> {NumberFormater(data.price)} </strong>  </p>
            <p>Payment Status:
              <span className={` text-white text-lg  m-2 px-2 p-1 rounded-lg  ${data.paymentStatus ? 'bg-[green]' : 'bg-[#bcbf20]'}`} >{data.paymentStatus ? 'Paid' : 'Waiting'}</span>
            </p>
          </div>
          <div className="mt-1">
            <p>RentTye: {data.appType}</p>
          </div>
        </div>

        <button
          className="outline mr-3 mt-4 w-fit bg-[#fc4a4a] hover:bg-[red] text-white py-2 px-2 rounded"
          onClick={() => handleSelect(data.appplicationId, data.homeId)}
        >
          cancel Rent
        </button>
      </div>
    </div>
  );
};

const UsersList = () => {
  const { setHousesList, applications, setApplications } = useContext(UtilityContext);
  const { token, user } = useContext(UserContext);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_baseURL}/application/byOwner/${user._id}`)
      .then((response) => {
        console.log("onwer list of applicatons are");
        console.log(response.data);
        setApplications(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, []);


  const handleSelect = (appId, homeId) => {
    axios
      .put(
        `${process.env.REACT_APP_baseURL}/application/update`,
        { id: appId, status: "completed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Application is canceled successfully");

        setApplications((prevApplications) => {
          const updatedApplications = prevApplications.map((app) => {
            if (app._id === appId) {
              return { ...app, status: "completed" };
            }
            return app;
          });
          return updatedApplications;
        });

        setHousesList((prevHousesList) => {
          const updatedHomesList = prevHousesList.map((house) => {
            if (house._id === homeId) {
              return { ...house, isRented: false };
            }
            return house;
          });
          return updatedHomesList;
        });
      })
      .catch((error) => {
        console.log("Error on canceling rented home");
        console.log(error);
      });
  };

  // get homesId rented by tenant
  const fitltedApplication = applications.filter((applica) => applica.status === "accepted");

  return (
    <div>
      <p className="text-xl font-semibold mx-4 mb-8 pb-4 border-b-1 border-[#7dd3fc]">
        List of Tenants
      </p>
      {fitltedApplication &&
        fitltedApplication.map((applic) => {

          if (!applic.applicantId) {
            return null; // Skip this application if applicantId is undefined
          }
          const data = {
            tenantImage: applic.applicantId.image,
            homeTitle: applic.homeId.title,
            name: applic.applicantId.name,
            lastName: applic.applicantId.lastName,
            email: applic.applicantId.email,
            phone: applic.applicantId.phone,
            appType: applic.applicationType,
            appplicationId: applic._id,
            homeId: applic.homeId._id,
            price: applic.paymentAmount,
            paymentStatus: applic.paymentStatus
          };
          return (
            <RentedTenantList
              key={applic._id}
              data={data}
              handleSelect={handleSelect}
            />
          );
        })}
    </div>
  );
};

export default UsersList;
