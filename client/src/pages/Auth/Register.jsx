import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay-ts";

export default function RegisterPage() {
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    subcity: "",
    woreda: "",
    kebele: "",
    phone: "",
    userType: "",
    image: "",
  });
  const [profileImage, setProfileImage] = useState(
    "https://res.cloudinary.com/dmegiw31y/image/upload/v1687336585/HomeRental/user_avatr_qmpy1y.png"
  );
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  let [loading, setLoading] = useState(false);

  const imageHanlder = (e) => {
    setImageFile(e.target.files[0]); // grab image file
    setProfileImage(URL.createObjectURL(e.target.files[0])); // create a url for locall rendering
  };

  async function registerUser(e) {
    e.preventDefault();
    setLoading(true); // set teh loading overlay to true
    // console.log(imageFile);

    // upload image and grab the link
    if (imageFile != null) {
      const formdata = new FormData();
      formdata.append("file", imageFile);
      formdata.append("upload_preset", process.env.REACT_APP_preset_key);
      axios
        .post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_cloud_name}/image/upload`,
          formdata
        )
        .then((response) => {
          console.log("image uploaded successfully");
          setUserData({ ...userData, image: response.data.secure_url });
          // console.log(response.data.secure_url)
        })
        .catch((erro) => {
          console.log("image upload error message ");
          setErrorMessage(" Image upload Error.");
          setLoading(false);
          console.log(erro);
        });
    }

    // register the user to the backend and forwared user to activateEmail page
    const backendRoutingPath =
      userData.userType === "buyer" ? "tenant" : userData.userType;
    axios
      .post(
        `${process.env.REACT_APP_baseURL}/${backendRoutingPath}/register`,
        userData
      )
      .then((response) => {
        // console.log("user register successfully ********************");

        if (response.data === "check your email") {
          navigate("/activateEmail");
        } else {
          setErrorMessage(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("user registion Error-----------------");
        console.log(error);
        setErrorMessage("Server error: " + error.message);
        setLoading(false);
      });
  }

  return (
    <div className="mt-4 pb-10 w-4/6 mx-auto px-3 grow flex items-center justify-around">
      <div className="mb-4">
        <h1 className="text-4xl text-center mb-4">Register</h1>

        {/* for image upload part  */}
        <div className="flex flex-col items-center justify-center py-2">
          <img
            src={profileImage}
            alt="Selected"
            className="h-56 object-fill outline outline-lightBlue rounded-lg "
          />

          <label
            htmlFor="image-input"
            className=" cursor-pointer bg-lightBlue mt-2  text-white p-1.5 hover:bg-lbHover  rounded-md"
          >
            <p className="mx-5">set Profile Picture</p>
          </label>
          <input
            required
            type="file"
            id="image-input"
            className="hidden"
            onChange={imageHanlder}
          />
        </div>

        <form className=" mx-auto px-5 py-2" onSubmit={registerUser}>
          {/* for error message */}
          <div
            className={`text-[red] ml-1 outline w-fit px-2 outline-[2px] rounded-lg  ${
              errorMessage ? "" : "invisible"
            }`}
          >
            {errorMessage ? <span> {errorMessage}</span> : <span> == </span>}
          </div>

          {/* for imput elements */}
          <div className="flex gap-x-2 justify-around">
            <div>
              <input
                type="text"
                required
                placeholder="first name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
              <input
                type="text"
                required
                placeholder="last name"
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
              />
              <input
                type="text"
                required
                placeholder="city"
                value={userData.city}
                onChange={(e) =>
                  setUserData({ ...userData, city: e.target.value })
                }
              />
              <input
                type="text"
                required
                placeholder="subcity"
                value={userData.subcity}
                onChange={(e) =>
                  setUserData({ ...userData, subcity: e.target.value })
                }
              />

              <input
                type="text"
                required
                placeholder="woreda"
                value={userData.woreda}
                onChange={(e) =>
                  setUserData({ ...userData, woreda: e.target.value })
                }
              />
            </div>

            <div>
              <input
                type="text"
                required
                placeholder="kebele"
                value={userData.kebele}
                onChange={(e) =>
                  setUserData({ ...userData, kebele: e.target.value })
                }
              />
              <input
                type="number"
                required
                placeholder="phone"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
              />
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
              <input
                type="password"
                required
                placeholder="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </div>
          </div>

          {/* terms and services */}
          <div className="mt-1">
            <input required className="" id="agreement" type="checkbox" />
            <label htmlFor="agreement">
              By signing this up you agree to our
              <Link
                className="underline text-lightBlue mx-1 text-black"
                to={"#"}
              >
                Privacy Policy
              </Link>{" "}
              and
              <Link
                className="underline  text-lightBlue mx-1  text-black"
                to={"#"}
              >
                Terms of Services
              </Link>{" "}
              .
            </label>
          </div>

          {/* who are you */}
          <div className="my-4">
            <p className="font-medium">Who are you?</p>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="owner"
                  checked={userData.userType === "owner"}
                  onChange={(e) =>
                    setUserData({ ...userData, userType: "owner" })
                  }
                />
                <span>Homeowner</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="tenant"
                  checked={userData.userType === "tenant"}
                  onChange={(e) =>
                    setUserData({ ...userData, userType: "tenant" })
                  }
                />
                <span>Tenant</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="buyer"
                  checked={userData.userType === "buyer"}
                  onChange={(e) =>
                    setUserData({ ...userData, userType: "buyer" })
                  }
                />
                <span>Buyer</span>
              </label>
              <fieldset className="flex gap-6">
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="owner"
                    checked={userData.userType === "owner"}
                    onChange={(e) =>
                      setUserData({ ...userData, userType: e.target.value })
                    }
                    required
                  />
                  <span>Homeowner</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="tenant"
                    checked={userData.userType === "tenant"}
                    onChange={(e) =>
                      setUserData({ ...userData, userType: e.target.value })
                    }
                  />
                  <span>Tenant</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="buyer"
                    checked={userData.userType === "buyer"}
                    onChange={(e) =>
                      setUserData({ ...userData, userType: e.target.value })
                    }
                  />
                  <span>Buyer</span>
                </label>
              </fieldset>
            </div>
          </div>

          {/* submit button */}
          <div className="w-2/4  mx-auto mt-4">
            <button
              type="submit"
              className="primary text-xl  bg-lightBlue hover:bg-lbHover Hover px-1 relative"
            >
              <LoadingOverlay
                active={loading}
                spinner
                className="loading-overlay"
                spinnerClassName="w-12 h-12"
                contentClassName="opacity-50 pointer-events-none"
                spinnerProps={{
                  style: {
                    borderTopColor: "lightblue",
                    borderLeftColor: "lightblue",
                  },
                }}
              ></LoadingOverlay>
              {loading ? "Processing..." : "Register"}
            </button>
          </div>

          {/* already a member or login */}
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
