import React, { useContext, useEffect } from "react";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import axios from "axios";
import Dropdown from "../components/Dropdown";
import { UserContext } from "../contexts/UserContextProvider";
import { FormatDate } from "../services/HelperFunction"

const Applicant = ({ data, selectHandler }) => {

  const actionOptions = ["Accept", "Reject"];
  return (data && <div
    className="outline outline-2 outline-[lightgray] flex justify-between items-center gap-1 p-4 rounded-lg m-4 mr-0"
    style={{ boxShadow: "0 0 1px #091240" }}
  >
    <div className="grow w-fit">
      <p>
        First Name:{" "}
        <span className="text-base font-semibold">
          {data.applicantName}
        </span>
      </p>
      <p>
        Last Name:{" "}
        <span className="text-base font-semibold">
          {data.applicantLastname}
        </span>
      </p>

      <p>
        Phone:{" "}
        <span className="text-base font-semibold">
          {data.phone}
        </span>
      </p>
    </div>
    <div className="grow shrink w-fit">
      <p>
        Checkin Date: <span className="text-base font-semibold">
          {data.checkin ? FormatDate(data.checkin) : ("Not Specified")}
        </span>
      </p>
      <p>
        Checkout Date:{" "}
        <span className="text-base font-semibold">
          {data.checkout ? FormatDate(data.checkout) : ("Not Specified")}
        </span>
      </p>
      <p>
        Number of Guests:{" "}
        <span className="text-base font-semibold">
          {data.numGuests}
        </span>
      </p>
    </div>
    <div className="grow shrink w-fit">

      <p>
        Visit Request Date:{" "}
        <span className="text-base font-semibold">
          {data.visitRequest ? FormatDate(data.visitRequest) : ("Not Specified")}
        </span>

      </p>
      <p className="pt-2">
        Status:{" "}
        <span className={`text-base text-white p-1 rounded-lg font-semibold px-2 ${data.status === 'completed' ? 'bg-[#4ff23d]' : ''} ${data.status === 'accepted' ? 'bg-[green]' : ''}  ${data.status === 'rejected' ? 'bg-[red]' : ''}  ${data.status === 'pending' ? 'bg-[#dfdf0e]' : ''} font-semibold`}>{data.status}</span>
      </p>
    </div>

    <div className={`${data.status !== 'pending' ? 'hidden' : ''} text-white bg-lightBlue mr-3`}>
      <Dropdown
        actions={actionOptions}
        onSelect={selectHandler}
        itemId={data.appplicationId}
        itemType="applicant"
      />
    </div>
  </div>
  );
};

const OwnerRentApplication = () => {
  const { applications, setApplications } = useContext(UtilityContext);
  const { user, token } = useContext(UserContext);

  const selectHandler = (appId, type, option) => {
    // get home price
    if (option === 'Accept') {
      console.log("yes yes");
    }
    console.log('id, type and option');
    console.log(appId, type, option);
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
    } else if (option === 'Reject') {
      axios.put(`${process.env.REACT_APP_RejectbaseURL}/application/update`, { id: appId, status: 'rejected' }, {
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
    axios.get(`${process.env.REACT_APP_baseURL}/application/byOwner/${user._id}`)
      .then((response) => {
        setApplications(response.data);
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

          if (!app.applicantId) {
            return null; // Skip this application if applicantId is undefined
          }
          if (app.applicationType === 'sale') {
            return null; // Skip  sale applications
          }

          const data = {
            applicantName: app.applicantId.name,
            applicantLastname: app.applicantId.lastName,
            phone: app.applicantId.phone,
            checkin: app.checkin,
            checkout: app.checkout,
            numGuests: app.numGuests,
            visitRequest: app.visitRequest,
            status: app.status,
            appplicationId: app._id,

          };
          return <Applicant key={app._id} data={data} selectHandler={selectHandler} />
        })

      }
    </div>
  );
};

export default OwnerRentApplication;
