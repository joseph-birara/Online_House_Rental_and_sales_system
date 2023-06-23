import { useContext, useEffect, useState } from "react";
import { IoBedOutline } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { FaShower, FaCheck } from "react-icons/fa";
import { RiRuler2Line } from "react-icons/ri";
import { UserContext } from "../contexts/UserContextProvider";
import axios from "axios";
import { UtilityContext } from "../contexts/UtilityContextProvide";

const RentedHomesList = ({ data, handleSelect, makePayment }) => {
  return (
    <div className="outline outline-[2px] outline-[lightgray] flex justify-between items-center gap-1 p-2 rounded-lg m-4">
      <div className="w-2/4 bg-gray-300 mx-2">
        <img className="rounded-lg" src={data.homeImage} alt="home image" />
      </div>
      <div className="grow-0 shrink px-1 p-1 mr-3">
        <h2 className="text-xl">{data.homeTitle}</h2>
        <p className="text-sm line-clamp-3 mt-2">{data.homeDescription}</p>
        <div className="flex justify-start gap-8">
          <p>
            <IoBedOutline /> {data.bedRoom}
          </p>
          <p>
            <FaShower /> {data.bathRoom}
          </p>
          <p>
            <RiRuler2Line /> {data.area}m<sup>2</sup>
          </p>
          <p className="flex justify-center items-center font-semibold">
            {data.appType}
          </p>
          <p className="font-semibold">Owner: {data.ownerName}</p>
          <p className="flex justify-center items-center font-semibold">
            Payment Status:
            <span className="flex justify-center items-center">
              {data.paymentStatus ? (
                <FaCheck className="text-[green]" size={20} />
              ) : (
                <TiDelete className="text-[red]" size={20} />
              )}
            </span>
          </p>
        </div>
        <button
          className="outline mr-3 mt-4 w-fit bg-[#fc4a4a] hover:bg-[red] text-white py-2 px-2 rounded"
          onClick={() =>
            handleSelect(data.applicationId, data.paymentInfo.homeId)
          }
        >
          Cancel Rent
        </button>

        {!data.paymentStatus && (
          <button
            className="outline ml-10 mr-3 mt-4 w-fit bg-[#39bbd2ee] hover:bg-[#32e5f9] text-white py-2 px-2 rounded"
            onClick={() => makePayment(data.paymentInfo)}
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};

const TenantRentedHomes = () => {
  const { HousesList, setHousesList, applications, setApplications } =
    useContext(UtilityContext);
  const { token, user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_baseURL}/application/bytenant/${user._id}`)
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setApplications, user._id]);

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
        console.log("Application is accepted successfully");

        // Update applications
        const updatedApplications = applications.map((app) => {
          if (app._id === appId) {
            return { ...app, status: "completed" };
          }
          return app;
        });
        setApplications(updatedApplications);

        // Update homesList
        const updatedHomesList = HousesList.map((house) => {
          if (house._id === homeId) {
            return { ...house, isRented: false };
          }
          return house;
        });
        setHousesList(updatedHomesList);
      })
      .catch((error) => {
        console.log("Error on canceling rented home");
        console.log(error);
      });
  };

  const makePayment = (data) => {
    const payload = {
      email: data.email,
      name: data.name,
      phone: data.phone,
      amount: data.price,
      recipientId: data.ownerId,
      homeId: data.homeId,
      payerId: data.tenantId,
      lastName: data.lastName,
      applicationId: data.applicationId,
    };

    axios
      .post(`${process.env.REACT_APP_baseURL}/payment/pay`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "success") {
          window.location.href = response.data.data;
        } else {
          alert("Please check your connection and credentials");
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log("Error payment request");
        console.log(error);
      });
  };

  const filteredApplications = applications.filter(
    (applica) => applica.status === "accepted"
  );

  return (
    <div>
      <p className="text-xl font-semibold mx-4 mb-8 pb-4 border-b-1 border-[#7dd3fc]">
        List of Rented Homes
      </p>
      {filteredApplications.map((applic) => {
        if (!applic.applicantId) {
          return null; // Skip this application if applicantId is undefined
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
          paymentInfo: {
            email: applic.applicantId.email,
            price: applic.homeId.price,
            homeId: applic.homeId._id,
            ownerId: applic.ownerId._id,
            tenantId: applic.applicantId._id,
            phone: applic.applicantId.phone,
            applicationId: applic._id,
            lastName: applic.applicantId.lastName,
            name: applic.applicantId.name,
          },
          applicationId: applic._id,
        };

        return (
          <RentedHomesList
            key={applic._id}
            data={data}
            handleSelect={handleSelect}
            makePayment={makePayment}
          />
        );
      })}
    </div>
  );
};

export default TenantRentedHomes;
