import React, { useContext, useEffect } from "react";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import axios from "axios";
import { Link } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import { UserContext } from "../contexts/UserContextProvider";

const Applicant = ({ application }) => {
  const {user, token} = useContext(UserContext);

  const { applications, setApplications } = useContext(UtilityContext);

  const actionOptions = ["Accept", "Reject"];
  const selectHandler = (appId, itemType, option) => {
    // const app = applications.filter((a) => a.id === appId)[0];
    option = option === "Accept" ? "accepted" : "rejected";
    const updatedApp = {
      status: option,
      id: appId,
    };
    // console.log(app);

    axios
      .put(`${process.env.REACT_APP_baseURL}/application/update`, updatedApp, {
        headers: {
          Authorization: `Bearer + ${token}`,
        }})
      .then((response) => {
        console.log(response.data);
        setApplications(((prev) => {
          console.log("apps: ", prev);
          const updated = prev.filter((app) => app._id === appId)[0];
          updated.status = option;
          return [updated, ...prev.filter((app) => app._id !== appId)]
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // application = application.application;
  // console.log("token: ",token);
  // console.log("z", application);
  // console.log("a", application.applicantId);
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
          <span className="text-base font-semibold">
            {application.applicantId.name}
          </span>
        </p>
        <p>
          Last Name:{" "}
          <span className="text-base font-semibold">
            {application.applicantId.lastName}
          </span>
        </p>
      </div>
      <div className="grow shrink w-fit">
        <p>
          Checkin Date:{" "}
          <span className="text-base font-semibold">{application.checkin}</span>
        </p>
        <p>
          Checkout Date:{" "}
          <span className="text-base font-semibold">
            {application.checkout}
          </span>
        </p>
      </div>
      <div className="grow shrink w-fit">
        <p>
          Number of Guests:{" "}
          <span className="text-base font-semibold">
            {application.numGuests}
          </span>
        </p>
        <p>
          Visit Request Date:{" "}
          <span className="text-base font-semibold">
            {application.visitRequest}
          </span>
        </p>
      </div>
      <div className="grow shrink w-fit">
        <p>
          Status:{" "}
          <span className="text-base font-semibold">{application.status}</span>
        </p>
        <p>
          Phone:{" "}
          <span className="text-base font-semibold">
            {application.applicantId.phone}
          </span>
        </p>
      </div>

      <div>
        <Dropdown
          actions={actionOptions}
          onSelect={selectHandler}
          itemId={application._id}
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
        // console.log("aa", response.data);
        setApplications(response.data);
        // console.log("ap", applications);
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
        applications.map((app) => {
          return <Applicant key={app._id} application={app} />;
        })}
    </div>
  );
};

export default Applicants;
