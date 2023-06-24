import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import { capitalizeFirstLetter } from "../../services/HelperFunction";
import LoadingOverlay from 'react-loading-overlay-ts';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProfilePage = () => {
  // return <div className="my-20 px-8 -2 py-4 shadow-xl rounded-xl mx-3"> Update profile page is this </div>
  const { user, setUser, token } = useContext(UserContext);
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    id: "", //user._id,
    name: "", //user.name,
    lastName: "", //user.lastName,
    email: "", //user.email,
    city: "", //user.city,
    subCity: "", //user.subCity,
    woreda: "", //user.woreda,
    kebele: "", //user.kebele,
    phone: "", //user.phone,
  });

  useEffect(() => {
    if (!user) return;

    if (user) {
      setUserData({
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        city: user.city,
        subCity: user.subCity,
        woreda: user.woreda,
        kebele: user.kebele,
      });
    }
  }, [user]);

  // const [isSubmited, setSubmited] = useState(false);
  var accountDescription = "Buyer";
  if (user && user.userType === "admin") {
    accountDescription = "Administrator";
    if (user.superAdmin) {
      accountDescription = "Super Administrator";
    }
  } else if (user && user.userType === "owner") {
    accountDescription = "Home Owner";
  } else if (user && user.userType === "tenant") {
    accountDescription = "Tenant";
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)

    let userRoute = "";
    let payload = userData;

    if (user.userType === "admin") {
      userRoute = "admin";
      payload = {
        id: user._id,
        name: userData.name,
        lastName: userData.lastName,
        phone: userData.phone,
        email: userData.email,
      };
    } else if (user.userType === "owner") {
      userRoute = "owner";
    } else {
      userRoute = "tenant";
    }

    axios
      .put(`${process.env.REACT_APP_baseURL}/${userRoute}/update`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("user updated and its data is ********************");

        // console.log(response.data);
        let updatedUserData = response.data
        updatedUserData.userType = user.userType

        // update context and locally stored data on the browser
        setUser(updatedUserData);
        window.localStorage.setItem("user-data", JSON.stringify(updatedUserData));
        navigate("/");
      })
      .catch((error) => {
        console.log("user update Error-----------------");
        console.log("toek " + token);
        console.log("paylod is " + JSON.stringify(payload));
        console.log(error);
        setLoading(false)

      });
  };

  return (
    userData &&
    user && (
      <form onSubmit={handleSubmit}>
        <div className="outline-[red] p-3 mx-auto mt-5 flex w-11/12 justify-evenly">
          <div className=" outline rounded-xl py-2 text-xl outline-[lightgray] w-1/5 my-8 ">
            <div className=" flex justify-center mt-10 ">
              <img
                className="rounded-lg w-auto h-36 "
                src={user && user.image}
                onError={(e) => {
                  e.target.src = 'https://media.gettyimages.com/id/1227618807/vector/human-face-avatar-icon-profile-for-social-network-man-vector-illustration.jpg?s=1024x1024&w=gi&k=20&c=-Iz47dY99Hx3S8JAkVLKvzQN65Qn8m7UPFAMbJvfd1Y=';
                }}
                alt="user-profile"
              />
            </div>
            <div className="flex justify-center flex-col gap-y-2 text-center my-4">
              <p className="text-[gray] ">
                {capitalizeFirstLetter(accountDescription)}
              </p>
              <p className="font-semibold ">
                {capitalizeFirstLetter(userData.name)}{" "}
                {capitalizeFirstLetter(userData.lastName)}
              </p>
            </div>

            <div className="flex justify-center w-4/6 mx-auto mt-10 ">
              <button
                type="submit"
                className="primary bg-lightBlue hover:bg-lbHover text-xl"
                onClick={handleSubmit}
              >
                <LoadingOverlay
                  active={loading}
                  spinner
                  className="loading-overlay"
                  spinnerClassName="w-12 h-12"
                  contentClassName="opacity-50 pointer-events-none"
                  spinnerProps={{
                    style: {
                      borderTopColor: 'lightblue',
                      borderLeftColor: 'lightblue',
                    },
                  }}
                >
                </LoadingOverlay>
                {loading ? "Processing..." : "Update Profile"}

              </button>
            </div>
          </div>

          <div className=" outline outline-[lightgray] rounded-lg w-9/12 flex justify-center p-8 ">
            <div className=" text-lg font-semibold outline-[green] w-1/2 p-5 ">
              <p className=" my-2">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                />
              </p>

              <p className=" my-2">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </p>

              {user.userType !== "admin" && (
                <p className=" my-2">
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    id="city"
                    value={userData.city}
                    onChange={(e) =>
                      setUserData({ ...userData, city: e.target.value })
                    }
                  />
                </p>
              )}
              {user.userType !== "admin" && (
                <p className=" my-2">
                  <label htmlFor="kebele">Kebele:</label>
                  <input
                    type="text"
                    id="kebele"
                    value={userData.kebele}
                    onChange={(e) =>
                      setUserData({ ...userData, kebele: e.target.value })
                    }
                  />
                </p>
              )}
            </div>

            <div className=" text-lg font-semibold outline-[green] w-1/2  p-5">
              <p className=" my-2">
                <label htmlFor="lastname">Last Name:</label>
                <input
                  type="text"
                  id="lastname"
                  value={userData.lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                />
              </p>

              <p className=" my-2">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                />
              </p>

              {user.userType !== "admin" && (
                <p className=" my-2">
                  <label htmlFor="subcity">SubCity:</label>
                  <input
                    type="text"
                    id="subcity"
                    value={userData.subCity}
                    onChange={(e) =>
                      setUserData({ ...userData, subCity: e.target.value })
                    }
                  />
                </p>
              )}
              {user.userType !== "admin" && (
                <p className=" my-2">
                  <label htmlFor="woreda">Woreda:</label>
                  <input
                    type="text"
                    id="woreda"
                    value={userData.woreda}
                    onChange={(e) =>
                      setUserData({ ...userData, woreda: e.target.value })
                    }
                  />
                </p>
              )}
            </div>
          </div>
        </div>
      </form >
    )
  );
};

export default UpdateProfilePage;
