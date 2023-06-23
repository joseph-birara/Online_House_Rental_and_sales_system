import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoadingOverlay from 'react-loading-overlay-ts';
import { UserContext } from "../../contexts/UserContextProvider";
import { UtilityContext } from "../../contexts/UtilityContextProvide";

export default function LoginPage({ isAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUserChoice, setCurrentUserChoice] = useState("");
  const { setUser, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('')
  let [loading, setLoading] = useState(false);

  // for admin purpose
  const { setOwnersList, setTenatList, setHousesList, setBuyerList, setAdminList, } = useContext(UtilityContext);
  useEffect(() => {
    // get all tenants
    axios
      .get("http://localhost:4000/tenant/all")
      .then((response) => {
        console.log(" admin is logged in and tenant is ");
        const both = response.data;

        // set tenant
        const tenant = both.filter((te) => te.userType === "tenant");
        setTenatList(tenant);

        // set buyer
        const buyer = both.filter((te) => te.userType === "buyer");
        setBuyerList(buyer);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // get all ADMINS
    axios
      .get("http://localhost:4000/admin/all")
      .then((response) => {
        console.log(" list of admins ");
        console.log(response.data);
        setAdminList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // get all owners
    axios
      .get("http://localhost:4000/owner/all")
      .then((response) => {
        console.log(" admin is logged in and owner is ");
        console.log(response.data);
        setOwnersList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    /// load home data what ever the user is
    axios
      .get("http://localhost:4000/houses/all")
      .then((response) => {
        console.log(" admin is logged in and houses is ");
        console.log(response.data);
        setHousesList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // for error message
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('')
      }, 2000);

      // Clean up the timer when the component unmounts or when the dependency changes
      return () => clearTimeout(timer);
    }
  }, [errorMessage]); // Empty dependency array ensures it only runs once

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    setLoading(true); // set teh loading overlay to true

    if (isAdmin) {
      setCurrentUserChoice("admin");
    }

    let routingLink = currentUserChoice

    // user types are only two so
    // all buyers should be tenants
    if (currentUserChoice === 'buyer') {
      routingLink = 'tenant'
    }

    if (currentUserChoice) {

      console.log(" email : " + email);
      console.log(" password : " + password);
      console.log(" userType : " + currentUserChoice);
      console.log('routing link ' + routingLink);

      axios
        .post(`http://localhost:4000/${routingLink}/login`, {
          email: email,
          password: password,
          userType: currentUserChoice
        })
        .then((response) => {
          if (response.data.token) {

            // grab the data and assign user type too.
            let userData = response.data.user;
            userData.userType = currentUserChoice;

            console.log("success logged in");
            console.log("token is " + response.data.token);

            // save token and user data
            setToken(response.data.token);
            setUser(userData);

            // save the data locally
            window.localStorage.setItem("user-token", JSON.stringify(response.data.token));
            window.localStorage.setItem("user-data", JSON.stringify(userData));
            navigate("/");
          } else {
            setErrorMessage(response.data);
            setLoading(false);
          }

        })
        .catch((error) => {
          console.log(" error message ");
          setErrorMessage("Server error: " + error.message)
          setLoading(false);
          console.log(error);
        });
    }
  }

  return (
    <div className=" mt-4 grow flex items-center justify-around">
      <div className="mb-64 w-2/4 ">
        <h1 className="text-4xl text-center mb-4">
          {" "}
          {isAdmin && <span> Admin </span>} Login
        </h1>

        {/* for error message */}
        <div className={` text-[red]  outline outline-[1px] rounded-lg w-4/6 pl-2 mx-auto ${errorMessage ? '' : 'invisible'}`}>
          {errorMessage ? (<span> {errorMessage}</span>) : (<span> == </span>)}
        </div>

        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required
          />
          <input
            type="password"
            required
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />

          {/* for user choice */}
          {!isAdmin && (
            <div className="my-4">
              <p className="font-medium">Who are you?</p>

              <fieldset className="flex gap-6">
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="owner"
                    checked={currentUserChoice === "owner"} // Bound to userType state
                    onChange={(e) => setCurrentUserChoice(e.target.value)} // Update userType state
                    required
                  />
                  <span>Homeowner</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="tenant"
                    checked={currentUserChoice === "tenant"} // Bound to userType state
                    onChange={(e) => setCurrentUserChoice(e.target.value)} // Update userType state
                  />
                  <span>Tenant</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="buyer"
                    checked={currentUserChoice === "buyer"} // Bound to userType state
                    onChange={(e) => setCurrentUserChoice(e.target.value)} // Update userType state
                  />
                  <span>Buyer</span>
                </label>
              </fieldset>
            </div>
          )}

          <Link className="underline text-lightBlue text-black" to={"/forgetpassword"}>
            Forgot passowrd
          </Link>

          <button
            type="submit"
            // onClick={() => setLoading(!loading)}
            className="primary bg-lightBlue hover:bg-lbHover Hover mt-4 relative"
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
            {loading ? "Checking..." : "SignIn"}
          </button>

          {!isAdmin && (
            <div className="text-center py-2 text-gray-500">
              Don't have an account yet?{" "}
              <Link className="underline text-black" to={"/register"}>
                Register now
              </Link>
            </div>
          )}
        </form>

      </div>
    </div>
  );
}
