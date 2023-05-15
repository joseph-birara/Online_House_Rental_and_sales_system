import React, { useContext, useEffect } from "react";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import axios from "axios";
import {Link} from'react-router-dom';
import Dropdown from "../components/Dropdown";

const Applicant = (application) => {
  const { applications, setApplications } = useContext(UtilityContext);
  
    const actionOptions = ["Accept", "Reject"];
    const selectHandler = (appId, itemType, option) => {

      const app = applications.filter((a) => a.id === appId)[0]
      app.status = "Accepted"
      console.log(app);

      axios
      .put(`${process.env.REACT_APP_baseURL}/application/update`, app)
      .then((response) => {
        console.log(response.data);
        // setApplications([response.data[1], response.data[2], response.data[3]]);
      })
      .catch((error) => {
        console.log(error);
      });

    };
    application = application.application
  return (
    <Link
      to={"#"}
      className="flex justify-between items-center cursor-pointer gap-1 p-4 rounded-lg m-4"
      style={{ boxShadow: "0 0 1px #091240" }}
    >
      <div className="flex w-32 h-32 bg-gray-300 shrink-0">
        <img src="" alt="" />
      </div>
      <div className="grow shrink w-fit">
        <p>
          First Name:{" "}
          <span className="text-base font-semibold">{application.applicantId.name}</span>
        </p>
        <p>
          Last Name:{" "}
          <span className="text-base font-semibold">{application.applicantId.lastName}</span>
        </p>
      </div>
      <div className="grow shrink w-fit">
        <p>
          Checkin Date: <span className="text-base font-semibold">{application.checkin}</span>
        </p>
        <p>
          Checkout Date:{" "}
          <span className="text-base font-semibold">{application.checkout}</span>
        </p>
      </div>
      <div className="grow shrink w-fit">
        <p>
          Number of Guests:{" "}
          <span className="text-base font-semibold">{application.numGuests}</span>
        </p>
        <p>
          Visit Request Date: <span className="text-base font-semibold">{application.visitRequest}</span>
        </p>
      </div>
      <div className="grow shrink w-fit">
        <p>
          Kebele: <span className="text-base font-semibold">{application.status}</span>
        </p>
        <p>
          Phone:{" "}
          <span className="text-base font-semibold">{application.applicantId.phone}</span>
        </p>
      </div>
    
        <div>
          <Dropdown
            actions={actionOptions}
            onSelect={selectHandler}
            itemId={application.applicantId.id}
            itemType="applicant"
          />
        </div>
    </Link>
  );
};

const Applicants = () => {
  const { applications, setApplications } = useContext(UtilityContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_baseURL}/application/all`)
      .then((response) => {
        setApplications([response.data[1], response.data[2], response.data[3]]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    // <>
    //   <p className="text-xl font-semibold mx-4 mb-8 pb-4 border-b-1 border-[#7dd3fc]">
    //     Applicants
    //   </p>
    //   <UsersLister
    //     userType="applicant"
    //     users={applications}
    //     dropdownSelectHandler={selectHandler}
    //   />
    // </>
    
    <div className="mt-4">
      
      {applications.length > 0 &&
        applications.map((app) => (
          <Applicant
            key={app._id}
            application={app}
          />
        ))}
    </div>
  );
};

export default Applicants;
