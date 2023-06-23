import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import axios from "axios";

const OwnerListerPage = () => {
  const { token } = useContext(UserContext);
  const { OwnersList, setOwnersList } = useContext(UtilityContext);
  const alternativeImageLink =
    "https://thumbs.dreamstime.com/b/user-blue-icon-member-service-43464682.jpg";
  const [selectedOption, setSelectionOption] = useState("");

  useEffect(() => {
    // Add any necessary side effect logic here
  }, []);

  const handleActionChange = (USERID, action, status) => {
    setSelectionOption("");
    if (action === "delete") {
      axios
        .delete(`${process.env.REACT_APP_baseURL}/owner/delete/${USERID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // update the context
          const filteredOwners = OwnersList.filter(
            (owner) => owner._id !== USERID
          );
          setOwnersList(filteredOwners);
          console.log("Owner with " + USERID + " is deleted");
          // return <Navigate to={"/homeOwner/homes/onListing"} />;
        })
        .catch((error) => {
          console.log("Error on deleting owner");
          console.log(error.message);
        });
    } else if (action === "activate") {
      console.log("pressed activate button");
      const ownerData = { id: USERID, accountStatus: !status };

      axios
        .put(`https://house-rental.onrender.com/owner/update`, ownerData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // update the context
          console.log("updated successfully");
          console.log(response.data);
          setOwnersList((prev) => {
            return prev.map((user) => {
              if (user._id === USERID) {
                return { ...user, accountStatus: ownerData.accountStatus };
              }
              return user;
            });
          });

          console.log(OwnersList);
          // return <Navigate to={"/homeOwner/homes/onListing"} />;
        })
        .catch((error) => {
          console.log("Error on updating owner");
          console.log(error.message);
        });
    }
  };

  return (
    <div>
      {OwnersList.length > 0 &&
        OwnersList.map((user) => (
          <div
            key={user.id}
            className="border border-[#cccaca] 11/12 mx-auto rounded flex flex-row items-center mb-3"
          >
            <div className="rounded bg-gray-300 mx-3">
              <img
                src={user.image || alternativeImageLink}
                alt=""
                className="w-28 h-28 rounded object-cover"
              />
            </div>

            <div className="ml-2 flex justify-evenly gap-x-3">
              <div>
                <p>
                  First Name:{" "}
                  <span className="ml-1 text-base font-semibold">
                    {user.name}
                  </span>
                </p>
                <p>
                  Last Name:{" "}
                  <span className="ml-1 text-base font-semibold">
                    {user.lastName}
                  </span>
                </p>
              </div>

              <div className="ml-2">
                <p>
                  Email:{" "}
                  <span className="ml-1 text-base font-semibold">
                    {user.email}
                  </span>
                </p>
                <p className="flex">
                  Acc. Status:
                  <div className="ml-3 flex justify-center items-center">
                    <svg
                      className={`w-4 h-4 mr-1.5 ${
                        user.accountStatus ? "text-[#38A169]" : "text-[#DC2626]"
                      } dark:text-green-400 flex-shrink-0`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <p> {user.accountStatus ? "active" : "inactive"} </p>
                  </div>
                </p>
              </div>

              <div className="ml-2">
                <p>
                  City:
                  <span className="ml-1 text-base font-semibold">
                    {user.city}
                  </span>
                </p>
                <p>
                  Subcity:{" "}
                  <span className="ml-1 text-base font-semibold">
                    {user.subcity}
                  </span>
                </p>
              </div>

              <div className="mx-2">
                <p>
                  Kebele:{" "}
                  <span className="ml-1 text-base font-semibold">
                    {user.kebele}
                  </span>
                </p>
                <p>
                  Phone:{" "}
                  <span className="ml-1 text-base font-semibold">
                    {user.phone}
                  </span>
                </p>
              </div>
            </div>

            <select
              className="outline ml-auto mr-10 bg-lightBlue hover:bg-lbHover text-white py-2 px-2 rounded"
              value={selectedOption}
              onChange={(e) => {
                handleActionChange(
                  user._id,
                  e.target.value,
                  user.accountStatus
                );
              }}
            >
              <option value="">Select Action</option>
              <option value="delete">Delete</option>
              <option value="activate">
                {user.accountStatus ? "Deactivate" : "Activate"}
              </option>
            </select>
          </div>
        ))}
    </div>
  );
};

export default OwnerListerPage;
