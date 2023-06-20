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
      className="flex oulinte-1 outline-[lightgray] items-center cursor-pointer gap-3 p-4 rounded-lg m-4"
      style={{ boxShadow: "1px 1px 1px 1px #091240" }}
    >
      <div className="flex w-32 h-32 bg-gray-300 shrink-0 mr-5">
        <img src={data.homePic} alt="" />
      </div>
      <div className=" grow-0 shrink">
        <h2 className="text-xl">{data.homeTitle}</h2>
        <div className=" flex gap-5 justify-around">
          <div className="px-2 mx-2">
            <p>
              <span >Application type: </span> <span>{data.appType}</span>
            </p>
            <p>
              <span>Houseowner name: </span> {data.ownerName}
            </p>
            <p>
              <span>Total price: </span> <span>{data.price}</span>
            </p>
          </div>
          <div className="px-2" >
            <p>
              <span>Checkin date: </span> <span>{data.checkin}</span>
            </p>
            <p>
              <span>Checkout date: </span> <span>{data.checkout ? data.checkout : "Not specified"}</span>
            </p>
            <p className="pt-2">
              <span>App Status: </span> <span className={` text-white  mx-2  p-2 rounded-xl outline  ${data.status === 'accepted' ? 'bg-[green]' : ''} ${data.status === 'completed' ? 'bg-[#4ff23d]' : ''}  ${data.status === 'rejected' ? 'bg-[red]' : ''}  ${data.status === 'pending' ? 'bg-[#dfdf0e]' : ''}`} >{data.appStatus}</span>
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

const TenantApplications = () => {
  const { applications, setApplications } = useContext(UtilityContext);
  const { user } = useContext(UserContext)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_baseURL}/application/all`)
      .then((response) => {

        // filter only tenant applications
        const filterApplicatios = response.data.filter(app => app.applicantId._id === user._id);
        setApplications(filterApplicatios);
        // console.log("ap", applications);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-4">
      {applications && applications.map((singleApp) => {
        
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

export default TenantApplications;
