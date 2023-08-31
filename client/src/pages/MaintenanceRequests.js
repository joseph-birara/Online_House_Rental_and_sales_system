import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContextProvider";

const Request = ({ request }) => {
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  // const dropdownActions = ["Mark as seen"];
  // const dropdownSelectHandler = (requestId, type, action) => {
  //   console.log(requestId, type, action);
  // };

  return (
    <div className="m-10 rounded-lg shadow-lg bg-white p-4">
      <div className="flex gap-6 pb-4 border-b-1 border-b-[#dce0e0] m-2">
        <p>To:</p>
        <p className="font-medium">
          {request.ownerId.name} {request.ownerId.lastName}
        </p>
      </div>
      <div className="flex gap-6 pb-4 border-b-1 border-b-[#dce0e0] m-2">
        <p>Date requested:</p>
        <p className="font-medium">{dateFormatter.format(Date.parse(request.updatedAt))}</p>
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
        <p className={`font-semibold ${request.fixStatus === 'Seen' ? " text-[green] " : " text-[#aabb38] "}`} >{request.fixStatus}</p>
      </div>
      {/* <div className="flex justify-end mr-4">
          <Dropdown
            mainText="Respond"
            actions={dropdownActions}
            onSelect={dropdownSelectHandler}
            itemType="request"
            itemId={request.id}
          />
        </div> */}
    </div>
  );
};

const MaintenanceRequests = () => {
  
  const { user } = useContext(UserContext);
  let [maintenanceRequests, setMRequests] = useState([]);

  useEffect(() => {
    axios
      .get("https://house-rental.onrender.com/maintenance/tenant/" + user._id)
      .then((response) => {
        console.log("retrieve succesful");
        setMRequests(response.data.requests);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [maintenanceRequests]);

  return (
    <div>
      <p className="text-xl font-semibold mx-4 mb-8 pb-4 border-b-1 border-[#7dd3fc]">
        List of Maintenance Requests
      </p>
      {maintenanceRequests.map((request) => {
        return <Request key={request.id} request={request} />;
      })}
    </div>
  );
};

export default MaintenanceRequests;
