import React, { useContext, useEffect } from "react";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import axios from "axios";
import Dropdown from "../components/Dropdown";
import { UserContext } from "../contexts/UserContextProvider";

const Applicant = ({ singleApplication, selectHandler }) => {

  const actionOptions = ["Accept", "Reject"];

  // const selectHandler = (appId, option) => {
  //   // const app = applications.filter((a) => a.id === appId)[0];
  //   // option = option === "Accept" ? "accepted" : "rejected";
  //   // get home price
  //   if (option === 'Accept') {
  //     axios.put(`${process.env.REACT_APP_baseURL}/application/update`, { id: appId, status: 'accepted' }, {
  //       headers: {
  //         Authorization: `Bearer + ${token}`,
  //       }
  //     }).then((response) => {
  //       console.log(' Applicatioin is accepted successfuly ');
  //       const updateApplication = applications.map(app => {
  //         if (app._id === appId) {
  //           return { app, statu: 'accepted' };
  //         }
  //         return app;
  //       });
  //       setApplications(updateApplication)

  //     })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } else {

  //     axios.put(`${process.env.REACT_APP_baseURL}/application/update`, { id: appId, status: 'rejected' }, {
  //       headers: {
  //         Authorization: `Bearer + ${token}`,
  //       }
  //     }).then((response) => {
  //       // console.log(response.data);
  //       console.log('Application is canceled successfully');
  //       const updateApplication = applications.map(app => {
  //         if (app._id === appId) {
  //           return { app, statu: 'rejected' };
  //         }
  //         return app;
  //       });
  //       setApplications(updateApplication)
  //     }).catch((error) => {
  //       console.log(error);
  //     });
  //   };

  // }

  return (singleApplication && <div
    className="outline outline-2 outline-[lightgray] flex justify-between items-center gap-1 p-4 rounded-lg m-4 mr-0"
    style={{ boxShadow: "0 0 1px #091240" }}
  >
    <div className="grow w-fit">
      <p>
        First Name:{" "}
        <span className="text-base font-semibold">
          {singleApplication.applicantId.name}
        </span>
      </p>
      <p>
        Last Name:{" "}
        <span className="text-base font-semibold">
          {singleApplication.applicantId.lastName}
        </span>
      </p>

      <p>
        Phone:{" "}
        <span className="text-base font-semibold">
          {singleApplication.applicantId.phone}
        </span>
      </p>
    </div>
    <div className="grow shrink w-fit">
      <p>
        Checkin Date:{" "}
        {singleApplication.checkin && <span className="text-base font-semibold">{singleApplication.checkin}</span>}
      </p>
      <p>
        Checkout Date:{" "}
        <span className="text-base font-semibold">
          {singleApplication.checkout ? (singleApplication.checkout) : ("Not Specified")}
        </span>
      </p>
      <p>
        Number of Guests:{" "}
        <span className="text-base font-semibold">
          {singleApplication.numGuests}
        </span>
      </p>
    </div>
    <div className="grow shrink w-fit">

      <p>
        Visit Request Date:{" "}
        <span className="text-base font-semibold">
          {singleApplication.visitRequest && singleApplication.visitRequest}
        </span>
      </p>
      <p className="pt-2">
        Status:{" "}
        <span className={`text-base text-white p-1 rounded-lg font-semibold px-2 ${singleApplication.status === 'completed' ? 'bg-[#4ff23d]' : ''} ${singleApplication.status === 'accepted' ? 'bg-[green]' : ''}  ${singleApplication.status === 'rejected' ? 'bg-[red]' : ''}  ${singleApplication.status === 'pending' ? 'bg-[#dfdf0e]' : ''} font-semibold`}>{singleApplication.status}</span>
      </p>
    </div>

    <div className={`${singleApplication.status !== 'pending' ? 'hidden' : ''} text-white bg-lightBlue mr-3`}>
      <Dropdown
        actions={actionOptions}
        onSelect={selectHandler}
        itemId={singleApplication._id}
        itemType="applicant"
      />
    </div>
  </div>
  );
};

const Applicants = () => {
  const { applications, setApplications } = useContext(UtilityContext);
  const { user, token } = useContext(UserContext);
  const actionOptions = ["Accept", "Reject"];

  const selectHandler = (appId, option) => {
    // get home price
    if (option === 'Accept') {
      axios.put(`${process.env.REACT_APP_baseURL}/application/update`, { id: appId, status: 'accepted' }, {
        headers: {
          Authorization: `Bearer + ${token}`,
        }
      }).then((response) => {
        console.log(' Applicatioin is accepted successfuly ');
        const updateApplication = applications.map(app => {
          if (app._id === appId) {
            return { app, statu: 'accepted' };
          }
          return app;
        });
        setApplications(updateApplication)

      })
        .catch((error) => {
          console.log(error);
        });
    } else {

      axios.put(`${process.env.REACT_APP_baseURL}/application/update`, { id: appId, status: 'rejected' }, {
        headers: {
          Authorization: `Bearer + ${token}`,
        }
      }).then((response) => {
        // console.log(response.data);
        console.log('Application is canceled successfully');
        const updateApplication = applications.map(app => {
          if (app._id === appId) {
            return { app, statu: 'rejected' };
          }
          return app;
        });
        setApplications(updateApplication)
      }).catch((error) => {
        console.log(error);
      });
    };

  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_baseURL}/application/all`)
      .then((response) => {
        // console.log("aa", response.data);
        const filterApplicatios = response.data.filter(app => app.ownerId._id === user._id);
        setApplications(filterApplicatios);
        console.log('applicants is clicked by owner and list of applications is');
        console.log(filterApplicatios)
      }).catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-1">
      <p className="text-xl font-semibold mx-4 mb-8 pb-4 border-b-1 border-[#7dd3fc]">
        List of Applications
      </p>
      {applications &&
        applications.map((app) => {
          return <Applicant key={app._id} singleApplication={app} selectHandler={selectHandler} />
        })

      }
    </div>
  );
};

export default Applicants;
