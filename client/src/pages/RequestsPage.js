import React from "react";
import Dropdown from "../components/Dropdown";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Request = ({ request, updateHandler }) => {
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const dropdownActions = ["Mark as seen"];

  const dropdownSelectHandler = (reqId, type, option) => {
    const reqData = {
      id: reqId,
      fixStatus: "Seen",
    };
    updateHandler(reqData);
  };
  return (
    <div className="m-10 rounded-lg shadow-lg bg-white p-4">
      <div className="flex gap-6 pb-4 border-b-1 border-b-[#dce0e0] m-2">
        <p>From:</p>
        <p className="font-medium">
          {request.tenantId.name} {request.tenantId.lastName}
        </p>
      </div>
      <div className="flex gap-6 pb-4 border-b-1 border-b-[#dce0e0] m-2">
        <p>Date requested:</p>
        <p className="font-medium">
          {dateFormatter.format(Date.parse(request.updatedAt))}
        </p>
      </div>
      <div className="flex gap-6 pb-4 border-b-1 border-b-[#dce0e0] m-2">
        <p>Title:</p>
        <p className="font-medium">{request.title}</p>
      </div>
      <div className="flex gap-6 pb-4 border-b-1 border-b-[#dce0e0] m-2">
        <p>Description:</p>
        <p>{request.message}</p>
      </div>
      <div className="flex gap-6 pb-4 border-b-1 border-b-[#dce0e0] m-2">
        <p>Status:</p>
        <p className={`font-semibold text-lg ${request.fixStatus === 'Seen' ? " text-[green] " : " text-[#c8c821] "}`} >{request.fixStatus}</p>
      </div>
      {request.fixStatus && request.fixStatus.toLowerCase() !== "seen" && (
        <div className="flex w-fit justify-end ml-auto  outline outline-lightBlue">
          <Dropdown
            mainText="Respond"
            actions={dropdownActions}
            onSelect={dropdownSelectHandler}
            itemType="request"
            itemId={request._id}
          />
        </div>
      )}
    </div>
  );
};

const RequestsPage = () => {

  const { user } = useContext(UserContext);
  let [maintenanceRequests, setMRequests] = useState([]);

  useEffect(() => {
    axios
      .get("https://house-rental.onrender.com/maintenance/houseowner/" + user._id)
      .then((response) => {
        setMRequests(response.data.requests);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateMReq = (requestData) => {
    console.log(requestData);

    axios
      .put(`https://house-rental.onrender.com/maintenance/edit`, requestData)
      .then((response) => {
        console.log("Request edited succesfully");
        const updatedMReqs = maintenanceRequests.map((mReq) => {
          if (mReq._id === requestData.id) {
            return { ...mReq, fixStatus: requestData.fixStatus };
          }
          return mReq;
        });
        setMRequests(updatedMReqs);
      })
      .catch((error) => {
        console.log("Error on updating Maintenance Request");
        console.log(error);
      });
  };

  return (
    <div>
      <p className="text-xl font-semibold mx-4 mb-8 pb-4 border-b-1 border-[#7dd3fc]">
        List of Maintenance Requests for you
      </p>
      {maintenanceRequests.map((request) => {
        return (
          <Request
            key={request._id}
            request={request}
            updateHandler={updateMReq}
          />
        );
      })}
    </div>
  );
};

export default RequestsPage;
