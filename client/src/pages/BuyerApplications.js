import React, { useContext, useEffect } from "react";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import axios from "axios";
import { UserContext } from "../contexts/UserContextProvider";

const Application = ({ data }) => {
  const { token } = useContext(UserContext);
  const { applications, setApplications } = useContext(UtilityContext);

  const hadleClick = (app_id) => {

    // update the state here to make it faster for updating state
    const updatedAppplications = applications.filter((AAA) => AAA._id !== app_id);
    setApplications(updatedAppplications)

    axios.delete(` http://localhost:4000/application/delete/${app_id}`, {
      headers: {
        Authorization: `Bearer + ${token}`,
      },
    })
      .then((response) => {
        console.log('application is cancled');
      })
      .catch((error) => {
        console.log(' error cancelign application');
        console.log(error);
      });
  }


  return (
    <div
      className="outline outline-[2px] outline-[lightgray]  flex justify-start items-center  gap-1 p-2 rounded-lg m-4 "
    // style={{ boxShadow: "1px 1px 1px 1px #091240" }}
    >
      <div className="w-1/6 bg-gray-300 ml-2">
        <img className="rounded-lg" src={data.homePic} alt="" />
      </div>
      <div className="grow-0 shrink px-1 p-1 ml-1">
        <h2 className="text-xl">{data.homeTitle}</h2>
        <div className=" flex justify-start gap-4">
          <div className="mx-2">
            <p>
              <span >Application type: </span> <span>{data.appType}</span>
            </p>
            <p>
              <span>Owner name: </span> {data.ownerName}
            </p>
            <p>
              <span>Total price: </span> <span>{data.price}</span>
            </p>
          </div>
          <div className="px-2" >
            <p>
              <span>Checkin date: </span> <span>{data.checkin ? data.checkin : "Not specified"}</span>
            </p>
            <p>
              <span>Checkout date: </span> <span>{data.checkout ? data.checkout : "Not specified"}</span>
            </p>
            <p className="pt-2">
              <span>App Status: </span> <span className={` text-white pb-1 mx-3 text-sm px-2 rounded-xl outline  ${data.status === 'accepted' ? 'bg-[green]' : ''} ${data.status === 'completed' ? 'bg-[#4ff23d]' : ''}  ${data.status === 'rejected' ? 'bg-[red]' : ''}  ${data.status === 'pending' ? 'bg-[#dfdf0e]' : ''}`} >{data.appStatus}</span>
            </p>
          </div>
        </div>

      </div>
      {data.appStatus && data.appStatus === 'pending' && <div className=" mx-auto" >
        <button className="p-2 mx-2 text-lg rounded-lg  text-white bg-[red] block  ml-5"
          onClick={() => hadleClick(data.appplicationId)}>
          Cancel Application
        </button>
      </div>}
    </div>
  );
};

const BuyerApplications = () => {
  const { applications, setApplications } = useContext(UtilityContext);
  const { user } = useContext(UserContext)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_baseURL}/application/bytenant/${user._id}`)
      .then((response) => {

        setApplications(response.data);
        // console.log("ap", applications);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [applications]);

  return (
    <div className="mt-1">
      <p className="text-xl font-semibold mx-4 mb-8 pb-4 border-b-1 border-[#7dd3fc]">
        List of Applications
      </p>
      {applications && applications.map((singleApp) => {
        if (!singleApp.applicantId) {
          return null; // Skip this application if applicantId is undefined
        }

        const data = {
          homePic: singleApp.homeId.images[0],
          homeTitle: singleApp.homeId.title,
          homeDescription: singleApp.homeId.description,
          appType: singleApp.applicationType,
          ownerName: singleApp.ownerId.name,
          checkin: singleApp.homeId.checkin,
          checkout: singleApp.homeId.checkout,
          price: singleApp.homeId.price,
          appStatus: singleApp.status,
          appplicationId: singleApp._id,
          status: singleApp.status
        };
        return <Application key={singleApp._id} data={data} />;
      })}
    </div>
  );
};

export default BuyerApplications;
