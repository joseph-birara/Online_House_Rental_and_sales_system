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
        <p className={`font-semibold ${request.fixStatus ==='Seen'? " text-[green] ": " text-[#aabb38] "}`} >{request.fixStatus}</p>
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
  // const maintenanceRequests = [
  //     {
  //       id: "0011",
  //       tenantName: "Biniyam",
  //       tenantLastName: "Hailu",
  //       requestDate: "Thu, 21 Jan, 2023",
  //       title: "The shower sink not working",
  //       description:
  //         "Bole, House or Office for Rent, Addis Ababa. The total area is 500\
  //       square meters. It has living and dining room with working fire-place,\
  //       kitchen, master bedroom with it's own bathroom, and two bedrooms with\
  //       common shower room. There are four service rooms with shower room,\
  //       garden and parking for 3 cars. The rate is 2,500 USD for residential\
  //       rent and 3,000 USD for office rent per month and fixed.",
  //       status : "seen"
  //     },
  //     {
  //       id: "0012",
  //       tenantName: "Biniyam",
  //       tenantLastName: "Hailu",
  //       requestDate: "Thu, 21 Jan, 2023",
  //       title: "The shower sink not working",
  //       description:
  //         "Bole, House or Office for Rent, Addis Ababa. The total area is 500\
  //       square meters. It has living and dining room with working fire-place,\
  //       kitchen, master bedroom with it's own bathroom, and two bedrooms with\
  //       common shower room. There are four service rooms with shower room,\
  //       garden and parking for 3 cars. The rate is 2,500 USD for residential\
  //       rent and 3,000 USD for office rent per month and fixed.",
  //       status : "seen"
  //     },
  //     {
  //       id: "0013",
  //       tenantName: "Biniyam",
  //       tenantLastName: "Hailu",
  //       requestDate: "Thu, 21 Jan, 2023",
  //       title: "The shower sink not working",
  //       description:
  //         "Bole, House or Office for Rent, Addis Ababa. The total area is 500\
  //       square meters. It has living and dining room with working fire-place,\
  //       kitchen, master bedroom with it's own bathroom, and two bedrooms with\
  //       common shower room. There are four service rooms with shower room,\
  //       garden and parking for 3 cars. The rate is 2,500 USD for residential\
  //       rent and 3,000 USD for office rent per month and fixed.",
  //       status : "seen"
  //     },
  //     {
  //       id: "0014",
  //       tenantName: "Biniyam",
  //       tenantLastName: "Hailu",
  //       requestDate: "Thu, 21 Jan, 2023",
  //       title: "The shower sink not working",
  //       description:
  //         "Bole, House or Office for Rent, Addis Ababa. The total area is 500\
  //       square meters. It has living and dining room with working fire-place,\
  //       kitchen, master bedroom with it's own bathroom, and two bedrooms with\
  //       common shower room. There are four service rooms with shower room,\
  //       garden and parking for 3 cars. The rate is 2,500 USD for residential\
  //       rent and 3,000 USD for office rent per month and fixed.",
  //       status : "seen"
  //     },
  //   ];
  const { user } = useContext(UserContext);
  let [maintenanceRequests, setMRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/maintenance/tenant/" + user._id)
      .then((response) => {
        console.log("retrieve succesful");
        setMRequests(response.data.requests);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
